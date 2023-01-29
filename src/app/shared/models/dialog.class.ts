export class Dialogs {
    constructor(
        public type: 'confirm' | 'alert' | 'warning' | 'success' | 'error',
        public title: string,
        public text: string,
        public textButton: string,
        public textButtonTwo?: string,
    ) {
    }
}
