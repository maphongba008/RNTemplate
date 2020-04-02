import { observable } from 'mobx';

const LoadingStatus = {
  NONE: 'NONE',
  LOADING: 'LOADING',
  FAIL: 'FAIL',
  SUCCESS: 'SUCCESS',
};

export class DataLoader<T> {
  @observable
  status = LoadingStatus.NONE;

  @observable
  data?: T;

  @observable
  errorMessage?: string;

  setData = (data: T) => {
    this.data = data;
    this.status = LoadingStatus.SUCCESS;
  };

  setError = (errorMessage: string) => {
    this.errorMessage = errorMessage;
    this.status = LoadingStatus.FAIL;
  };

  startLoading = () => {
    this.status = LoadingStatus.LOADING;
  };

  get isLoading() {
    return this.status === LoadingStatus.LOADING;
  }
  get isSuccess() {
    return this.status === LoadingStatus.SUCCESS;
  }
  get isFail() {
    return this.status === LoadingStatus.FAIL;
  }
}
