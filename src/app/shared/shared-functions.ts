import { Injectable } from '@angular/core';
//import * as moment from 'moment';
import { Router } from '@angular/router';
//import { NotifierService } from 'angular-notifier';
//import isMobile from 'ismobilejs';
import * as _ from 'lodash';
import { IUser } from './models/IUser';
//import { IUser } from '../models/IUser';
@Injectable({
  providedIn: 'root',
})
export class SharedFunctions {
  /* private readonly notifier: NotifierService;*/

  constructor(private router: Router /*, notifierService: NotifierService*/) {
    /*this.notifier = notifierService;*/
  }
  public omitFieldsFromObject = (object: object, keys: string[]) =>
    _.omit(object, keys);
  public pickFieldsFromObject = (object: object, keys: string[]) =>
    _.pick(object, keys);
  public isEmpty = (value: any) => _.isEmpty(value);
  public isEquals = (value1: any, value2: any) => _.isEqual(value1, value2);
  public isNumber = (value: any) => _.isNumber(value);
  public isBoolean = (value: any) => _.isBoolean(value);
  public isObject = (value: any) => _.isObject(value);
  public isString = (value: any) => _.isString(value);
  public isDate = (value: any) => _.isDate(value);
  public capitaliseFirstLetter = (value: string) => _.capitalize(value);
  public camelCaseString = (value: string) => _.camelCase(value);
  public startCase = (value: string) => _.startCase(value);
  public snakeCase = (value: string) => _.snakeCase(value);
  public getRandomNumber = (min: number, max: number) => _.random(min, max);
  public getMinimum = (value: any[]) => _.min(value);
  public getMaximum = (value: any[]) => _.max(value);
  public getSum = (value: any[]) => _.sum(value);
  public roundNumberTo = (number: number, roundval: number) =>
    _.round(number, roundval);
  public checkIfObjectHasAField = (object: object, path: string) =>
    _.has(object, path);
  public sortArrayBy = (array: any[], fields: string[]) =>
    _.sortBy(array, fields);
  public isArray = (value: any) => _.isArray(value);
  public orderArrayBy = (array: any[], fields: string[], orderTypes: any[]) =>
    _.orderBy(array, fields, orderTypes);
  public filterArray = (array: any[], fieldsWithValues: object) =>
    _.filter(array, fieldsWithValues);
  public findFromArray = (array: any[], fieldsWithValues: object) =>
    _.find(array, fieldsWithValues);
  public includes = (value1: any, value2: any) => _.includes(value1, value2);
  // you can find other functions from here -> https://lodash.com/docs/4.17.15
  public getFieldValueFromObject = (
    object: object,
    path: string,
    defaultValue: any
  ) => _.get(object, path, defaultValue);
  public getProp = (k: any[], o: any): any =>
    k.reduce((obj: any, key: any) => (obj && obj[key] ? obj[key] : null), o);
  /* public convertDateToString = (date: Date) =>
    moment(date).format('YYYY-MM-DD');*/
  public navigateToExternal = (ex_url: string) => (location.href = ex_url);
  public navigateToInternal = (locationName: string) =>
    this.router.navigateByUrl(`/${locationName}`);
  public deserialiseToken = (token: string): IUser => {
    let payload;
    if (!this.isEmpty(token)) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      const user: IUser = JSON.parse(payload);
      return user;
    }
    return null;
  };
  public getStatusClass(status: string) {
    if (status === 'Approved') {
      return 'font-success';
    } else if (status === 'Declined') {
      return 'font-danger';
    } else {
      return '';
    }
  }
  public handleUnauthorisedError = (error: any, isConsole = false) => {
    const errorCode = this.getFieldValueFromObject(error, 'status', 0);
    if (errorCode === 500) {
      this.showNotification(
        'error',
        'Session expired, you will be redirected to login'
      );
      this.clearSessionAndRedirect();
    } else {
      const errorMessage = this.getFieldValueFromObject(error, 'error', error);
      console.error(errorMessage);
      if (!isConsole) {
        this.showNotification('error', errorMessage);
      }
    }
  };
  public getArrayLength = (object: any, key: string): number => {
    const array = this.getFieldValueFromObject(object, key, []);
    return !this.isEmpty(array) && this.isArray(array) ? array.length : 0;
  };
  public groupLinks = () => ['Profile', 'Admin', 'Academics', 'Collaboration'];
  public getYears(min: number): string[] {
    const years: string[] = [];
    const maxYear = new Date().getFullYear();
    for (let yr = min; yr <= maxYear; yr++) {
      years.push(yr.toString());
    }
    return years;
  }
  public areArraysEqual = (a: any[], b: any[]): boolean => {
    if (this.isEmpty(a) || this.isEmpty(b)) {
      return false;
    }
    return a.reduce((p, c, i) => {
      if (!!c && typeof c === 'object' && c.constructor === Array) {
        return p && this.areArraysEqual(c, b[i]);
      } else if (!!c && !!b[i] && typeof c === 'object') {
        return p && this.areArraysEqual(Object.values(c), Object.values(b[i]));
      } else {
        return p && c === b[i];
      }
    }, a.length === b.length);
  };
  public getRandomInteger = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min)) + min;
  public tokenName = 'learnercenter-token';
  public MODERATOR_PASSWORD = '1234';
  public ATTERNDEE_PASSWORD = '4321';
  public MAX_LESSON_ATTENDANCE = 200;
  public ALLOWED_PREJOIN_MINUTES = 15;
  public MINIMUM_LESSON_PERIOD = 30; //minutes
  public MINIMUM_LESSON_DATE_FROM_CURRENT_DATE = 1; //30; // minutes
  public MAXIMUM_LESSON_PERIOD = 3; //hours
  public COUNTRY_CODE = 'ZA';
  public checkFileSize(file: any) {
    if (file.size < 104857600) {
      return true;
    } else {
      return false;
    }
  }
  /* public checkIfLessonScheduleIsValid = (
    startTime: string,
    endTime: string
  ): boolean => {
    const startDate: Date = new Date();
    const endDate: Date = new Date();
    startDate.setHours(parseInt(startTime.substr(0, 2)));
    startDate.setMinutes(parseInt(startTime.substr(3, 2)));

    endDate.setHours(parseInt(endTime.substr(0, 2)));
    endDate.setMinutes(parseInt(endTime.substr(3, 2)));
    const minimum = moment(endDate).diff(moment(startDate), 'minutes');
    const maximum = moment(endDate).diff(moment(startDate), 'hours');
    return (
      moment(endDate).isAfter(startDate) &&
      minimum >= this.MINIMUM_LESSON_PERIOD &&
      maximum <= this.MAXIMUM_LESSON_PERIOD
    );
  };
  public isLessonStartDateValid(lessonDateStr: string, startTime: string) {
    console.info('lessonDateStr', lessonDateStr);
    const lessonDate = new Date(lessonDateStr);
    lessonDate.setHours(parseInt(startTime.substr(0, 2)));
    lessonDate.setMinutes(parseInt(startTime.substr(3, 2)));
    const currentDateTime: Date = new Date();
    console.info(lessonDate, currentDateTime);
    const minimum = moment(lessonDate).diff(moment(currentDateTime), 'minutes');
    return (
      moment(lessonDate).isAfter(currentDateTime) &&
      minimum >= this.MINIMUM_LESSON_DATE_FROM_CURRENT_DATE
    );
  }*/
  public clearSessionAndRedirect = (isOnGuard: boolean = false) => {
    sessionStorage.removeItem('@@STATE');
    sessionStorage.removeItem(this.tokenName);
    if (!isOnGuard) {
      setTimeout(function () {
        this.router.navigate(['/login']);
        //window.location.replace('/login');
      }, 300);
    } else {
      this.router.navigate(['/login']);
      //window.location.replace('/login');
    }
  };
  public calendarColors = Object.freeze({
    red: {
      primary: '#dc3545',
      secondary: '#FAE3E3',
    },
    green: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
    blue: {
      primary: '#007bff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  });
  public REGEX_PATTERNS = Object.freeze({
    aplhaNumericPattern: '^[a-zA-Z0-9 ]*$',
    textOnlyPattern: '^[a-zA-Z ]*$',
    textWithSpcialCharactersPattern: '^[a-zA-Z--_!@#$%^&*(),.?":{}|<> ]*$',
    textWithSpcialCharactersAndNonDigitPattern:
      '^[a-zA-Z\\D--_!@#$%^&*(),.?":{}|<> ]*$',
    telNoPattern: '^[0-9]{10}$',
    identityNoPattern: '^[0-9]{13}$',
    emailPattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$',
    url: '^(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})',
    passwordPattern:
      '^(?=.*[A-Z])(?=.*[a-z])((?=.*[0-9])(?=.*[!@#$%^&*]))|((?=.*[!@#$%^&*])(?=.*[0-9]))(?=.{8,})$',
    numericOnlyPattern: '^[0-9]*$',
  });
  public isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
  public isMac =
    navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
    navigator.platform.toUpperCase().indexOf('IPAD') >= 0
      ? true
      : false;
  /*public isMobile = () => {
    return (
      isMobile(window.navigator).phone || isMobile(window.navigator).tablet
    );
  };*/
  public capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  public showNotification(type: string, message: string) {
    //https://stackblitz.com/edit/angular-notifier-demo?file=src%2Fapp%2Fapp.component.html
    //this.notifier.hideAll();
    // this.notifier.notify(type, message);
  }
}
