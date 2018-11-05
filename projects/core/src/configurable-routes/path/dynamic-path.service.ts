import { Injectable } from '@angular/core';
import { ServerConfig } from '../../config/server-config/server-config';
import {
  getSegments,
  isParameter,
  getParameterName,
  removeLeadingSlash
} from '../path-utils';
import { defaultRoutesTranslations } from '../routes-config';
import { PathService } from './path.service';

@Injectable()
export class DynamicPathService {
  constructor(private pathService: PathService, private config: ServerConfig) {}

  transform(url: string) {
    const { pageName, parameters } = this.recognizeRoute(url);

    if (!pageName) {
      // spike todo: check if this console.warn is enough descriptive
      if (!this.config.production) {
        console.warn(
          `No configured default route path is matching with the url '${url}'. `,
          'Default routes configuration: ',
          defaultRoutesTranslations
        );
      }
      return url;
    }
    return this.pathService.transform(pageName, parameters);
  }

  private recognizeRoute(
    url: string
  ): {
    pageName: string;
    parameters: object;
  } {
    url = removeLeadingSlash(url); // url will be compared with paths translations which do not have leading slash

    const urlSegments = getSegments(url);
    const pageName = this.getPageNameWithLongestMatchingSegmentsPrefix(
      urlSegments
    );
    if (!pageName) {
      return { pageName, parameters: {} };
    }

    const pathSchema = this.getPathWithSameSegmentsNumber(
      urlSegments,
      pageName
    );
    return {
      pageName,
      parameters: this.getParametersValues(urlSegments, pathSchema)
    };
  }

  // compares url segments array with segments of path schema. for parameters in path schema it extracts value from relevant segment of url
  private getParametersValues(
    urlSegments: string[],
    pathSchema: string
  ): object {
    const parameters = {};
    const pathSchemaSegments = getSegments(pathSchema);
    const pathSchemaSegmentsLength = pathSchemaSegments.length;
    for (let i = 0; i < pathSchemaSegmentsLength; i++) {
      const pathSchemaSegment = pathSchemaSegments[i];
      if (isParameter(pathSchemaSegment)) {
        const parameterName = getParameterName(pathSchemaSegment);
        parameters[parameterName] = urlSegments[i];
      }
    }
    return parameters;
  }

  private getPathWithSameSegmentsNumber(
    urlSegments: string[],
    pageName: string
  ): string {
    const paths = defaultRoutesTranslations[pageName];
    return paths.find(path => urlSegments.length === getSegments(path).length);
  }

  private getPageNameWithLongestMatchingSegmentsPrefix(urlSegments: string[]) {
    return Object.keys(defaultRoutesTranslations)
      .map(pageName => {
        const paths = defaultRoutesTranslations[pageName];
        const commonPrefixLengths = paths.map(path => {
          const pathSegments = getSegments(path);
          return this.getCommonPrefix(urlSegments, pathSegments).length;
        });
        return {
          pageName,
          maxCommonPrefixLength: Math.max(...commonPrefixLengths)
        };
      })
      .reduce(
        (best, current) =>
          current.maxCommonPrefixLength > best.maxCommonPrefixLength
            ? current
            : best,
        {
          pageName: null,
          maxCommonPrefixLength: 0
        }
      ).pageName;
  }

  private getCommonPrefix(listA: string[], listB: string[]): string[] {
    const commonPrefix = [];
    const listALength = listA.length;
    for (let i = 0; i < listALength; i++) {
      if (listA[i] === listB[i]) {
        commonPrefix.push(listA[i]);
      } else {
        break;
      }
    }
    return commonPrefix;
  }
}
