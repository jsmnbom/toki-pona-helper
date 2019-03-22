import {parse as qsParse} from 'query-string';

import {SingleTutor} from "./singleTutor";
import {SitelenTutor} from "./sitelenTutor";


document.addEventListener("DOMContentLoaded", () => {
    const parsed = qsParse(location.search);

    let tutor;

    switch (parsed['type']) {
        case 'single':
            console.log('SingleTutor');
            tutor = new SingleTutor();
            break;
        // case 'multi':
        //     this.tutorType = TutorType.Multi;
        //     break;
        // case 'full':
        //     this.tutorType = TutorType.Sentence;
        //     break;
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
