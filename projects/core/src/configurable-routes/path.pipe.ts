import { Pipe, PipeTransform } from '@angular/core';
import { AuthModuleConfig } from 'projects/storefrontlib/src/lib/auth/auth-module.config';

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
  // TODO use some other config than AuthModuleCOnfig
  constructor(private config: AuthModuleConfig) {}

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

    return this.injectParametersValues(path, parametersObject);
  }

  private injectParametersValues(path: Path, parametersObject: object) {
    return this.getSegments(path).map(
      segment =>
        this.isParameter(segment)
          ? parametersObject[this.getParameterName(segment)]
          : segment
    );
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
    const matchingParameters = this.match(pathParameters, givenParameters);
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

  private match(
    testedList: Parameter[],
    matchingList: Parameter[]
  ): Parameter[] {
    return testedList.filter(testedEl => this.isIn(testedEl, matchingList));
  }

  private isIn<T>(element: T, list: T[]): boolean {
    return list.indexOf(element) !== -1;
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
