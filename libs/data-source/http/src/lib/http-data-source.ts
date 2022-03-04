import { Observable, defer, retry, mergeMap } from 'rxjs';
import fetch from 'node-fetch';

export class HttpDataSource {
  constructor(private baseUrl: string) {}

  get<T>(...path: unknown[]): Observable<T> {
    return defer(() => fetch([this.baseUrl, ...path].join('/'))).pipe(
      retry(3),
      mergeMap((response) => response.json() as Promise<T>)
    );
  }
}
