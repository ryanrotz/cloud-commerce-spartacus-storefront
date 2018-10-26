import { Pipe, PipeTransform } from '@angular/core';
import { ServerConfig } from '../config/server-config/server-config';

type Segment = string;
type Path = string;
type Parameter = string;
interface PathWithMatchingParameters {
  path: Path;
  matchingParameters: Parameter[];
  isMatchingAllParameters: boolean;
}

@Pipe({
  name: 'cxPath'
})
export class PathPipe implements PipeTransform {
  // TODO use some other config than ServerConfig
  constructor(private config: ServerConfig) {}

  // always returns an absolute path (with leading /)
  transform([pageName, parametersObject]: [string, object]): Segment[] {
    const pathCandidates = this.config.routePaths[pageName];

    if (pathCandidates === undefined) {
      if (!this.config.production) {
        // TODO check if it really calls console.warn when pageName does not exist as a key in the config
        console.warn(`No paths were configured for page '${pageName}'!`);
      }
      return ['']; // main route
    }

    const {
      path,
      isMatchingAllParameters
    } = this.getPathWithMostMatchingParameters(
      pathCandidates,
      Object.keys(parametersObject)
    );

    if (!this.config.production) {
      if (!isMatchingAllParameters) {
        // TODO: console.warn when no path matching fully its parameters with expected list
        // TODO check if it does print nicely
        console.warn(
          `Selected path did not match all its parameters with given parameters. Path: `,
          path,
          `. Given parameters: `,
          Object.keys(parametersObject)
        );
      }
    }

    const absolutePath = this.ensureLeadingSlash(path);
    return this.injectParametersValues(absolutePath, parametersObject);
  }

  private injectParametersValues(path: Path, parametersObject: object) {
    return this.getSegments(path).map(
      segment =>
        this.isParameter(segment)
          ? parametersObject[this.getParameterName(segment)]
          : segment
    );
  }

  private ensureLeadingSlash(path: Path): Path {
    return (path = path.startsWith('/') ? path : '/' + path);
  }

  // returns first path with most matching parameters and list of matching parameters
  // TODO think of a way for Client to define his own function to pick best path (for each module separate)

  private getPathWithMostMatchingParameters(
    pathCandidates: Path[],
    givenParameters: Parameter[]
  ): PathWithMatchingParameters {
    const pathsWithMatchingParameters = pathCandidates.map(path =>
      this.getPathWithMatchingParameters(path, givenParameters)
    );

    if (
      !this.config.production &&
      !pathsWithMatchingParameters.some(
        candidate => candidate.isMatchingAllParameters
      )
    ) {
      console.warn(
        `No configured path matching its parameters with all given parameters. Configured paths: `,
        pathCandidates,
        `. Given parameters: `,
        givenParameters
      );
    }

    return pathsWithMatchingParameters.reduce(
      (best, current) =>
        current.matchingParameters.length > best.matchingParameters.length
          ? current
          : best,
      { path: '', matchingParameters: [], isMatchingAllParameters: false }
    );
  }

  private getPathWithMatchingParameters(
    path: Path,
    givenParameters: Parameter[]
  ): PathWithMatchingParameters {
    const pathParameters = this.getParameters(path);
    const matchingParameters = pathParameters.filter(
      parameter => givenParameters.indexOf(parameter) !== -1
    );
    return {
      path,
      matchingParameters,
      isMatchingAllParameters:
        matchingParameters.length === pathParameters.length
    };
  }

  private getParameters(path: Path) {
    return this.getSegments(path)
      .filter(this.isParameter)
      .map(this.getParameterName);
  }

  private getSegments(path: Path): Segment[] {
    return path.split('/');
  }

  private isParameter(segment: Segment): boolean {
    return segment.startsWith(':');
  }

  private getParameterName(segment: Segment): Parameter {
    return segment.slice(1); // remove leading ':'
  }
}
