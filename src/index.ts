"use strict";

import * as _ from 'lodash';

import { ANSWER } from './modules/constants';
import SmartClass from './modules/functions';
import { OtherClass } from './modules/lib';

function sleep(delayMillis: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        setTimeout(resolve, delayMillis);
    });
}

async function printTestsInConsole() {
    const words: string[] = ['hello', 'world'];
    _.each(words, (word: string) => console.log(word));

    console.log('here are some number: ');
    [1, 2, 3].map((n: number) => n ** 2).forEach(console.log);

    console.log(`but we only trust this one: ${ANSWER}`);

    console.log('et voilà!');

    const instance: SmartClass = new SmartClass();
    instance.doSomethingSmart();

    const t: OtherClass = new OtherClass();
    t.justDoIt();

    console.log('--- END several modules used and no one hurt ---');

    await sleep(2000);
}

function playWithDom() {
    console.log("let's play with DOM amigo");

    const successMessage: HTMLElement = document.getElementById('successMessage');
    successMessage.classList.add('visible');
}

async function initPage() {
    await printTestsInConsole();

    playWithDom();
}

initPage();