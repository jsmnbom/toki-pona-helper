import {parse as qsParse} from 'query-string';

import {SingleTutor} from "./singleTutor";
import {SitelenTutor} from "./sitelenTutor";
import {MultiTutor} from "./multiTutor";
import {SentenceTutor} from "./sentenceTutor";
import {ProperNounTutor} from "./properNounTutor";


document.addEventListener("DOMContentLoaded", () => {
    const parsed = qsParse(location.search);

    let tutor;

    switch (parsed['type']) {
        case 'single':
            console.log('SingleTutor');
            tutor = new SingleTutor();
            break;
        case 'multi':
            console.log('MultiTutor');
            tutor = new MultiTutor();
            break;
        case 'proper-noun':
            console.log('ProperNounTutor');
            tutor = new ProperNounTutor();
            break;
        case 'sentence':
            console.log('SentenceTutor');
            tutor = new SentenceTutor();
            break;
        case 'sitelen':
            console.log('SitelenTutor');
            tutor = new SitelenTutor();
            break;
        // case 'sign':
        //     this.tutorType = TutorType.Sign;
        //     break;
        default:
            console.error("Unsupported tutor type specified!");
            return;
    }

    tutor.run().catch(err => {
        console.error(err);
    });
});
