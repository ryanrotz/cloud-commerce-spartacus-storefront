import { Pipe, PipeTransform } from '@angular/core';
import { ServerConfig } from '../config/server-config/server-config';

type Segment = string;
type Path = string;
type Parameter = string;

@Pipe({
  name: 'cxPath'
})
export class PathPipe implements PipeTransform {
  // TODO use some other config than ServerConfig
  constructor(private config: ServerConfig) {}

  // always returns an absolute path (with leading /)
  transform([pageName, parametersObject]: [string, object]): Segment[] {
    const paths = this.config.routePaths[pageName];

    if (paths === undefined) {
      if (!this.config.production) {
        // TODO check if it really calls console.warn when pageName does not exist as a key in the config
        console.warn(`No paths were configured for page '${pageName}'!`);
      }
      return ['/']; // main route
    }

    const path = this.getFirstPathMatchingAllParameters(
      paths,
      Object.keys(parametersObject)
    );

    if (path === undefined) {
      if (!this.config.production) {
        // TODO check if it does print nicely
        console.warn(
          `No configured path matches all its parameters to given parameters object. Configured paths: `,
          path,
          `. Parameters object: `,
          parametersObject
        );
      }
      return ['/']; // main route
    }

    const absolutePath = this.ensureLeadingSlash(path); // TODO: rethink if always return absulte path - for configurable child routes
    return this.injectParameterValues(absolutePath, parametersObject);
  }

  private injectParameterValues(path: Path, parametersObject: object) {
    return this.getSegments(path).map(
      segment =>
        this.isParameter(segment)
          ? parametersObject[this.getParameterName(segment)]
          : segment
    );
  }

  private getFirstPathMatchingAllParameters(
    paths: Path[],
    givenParameters: Parameter[]
  ): Path {
    return paths.find(path =>
      this.getParameters(path).every(
        parameter => givenParameters.indexOf(parameter) !== -1
      )
    );
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

  private ensureLeadingSlash(path: Path): Path {
    return (path = path.startsWith('/') ? path : '/' + path);
  }
}
