import { LitElement, html, css, unsafeCSS, customElement, property } from 'lit-element';
import style from "./select.scss";

@customElement('dha-select')
export class DsSelect extends LitElement {
    currentActiveIndex: number;
    currentScrollY: number;
    @property({type : String}) content = ""

    static get styles() {
        return unsafeCSS(style);
    }

    constructor(){
        super();

        this.currentActiveIndex = 0;
        this.currentScrollY = 0;
    }

    firstUpdated(changedProps: any) {
        //implementation
        this.handleKeyBoard();
        this.disableScroll();
    }

    handleClick(e: MouseEvent){
        this.shadowRoot?.querySelector(".select-container")?.classList.add("open");
            (<HTMLElement>this.shadowRoot?.querySelectorAll(".select-option")[0]).focus();
    }

    preventDefault(e: KeyboardEvent) {
        e.preventDefault();
    }

    preventDefaultForScrollKeys(e: KeyboardEvent) {
        var keys: any = {"ArrowDown": "1", "ArrowUp": "1"};
        if (keys[e.code]) {
          this.preventDefault(e);
          return false;
        }
    }

    disableScroll() {
        this.addEventListener('keydown', this.preventDefaultForScrollKeys, false);
    }

    handleKeyBoard(){
        this.addEventListener('keyup', (e: KeyboardEvent) => {
            const options = this.shadowRoot?.querySelectorAll(".select-option");
            const select = this.shadowRoot?.querySelector(".select-container");

            switch(e.code){
                case "Space":
                    this.currentScrollY = window.scrollY;
                break;
                case "ArrowDown":
                    if(!select?.classList.contains("open")){
                        select?.classList.add("open");
                        //@ts-ignore
                        options[0].focus();
                    } else{
                        this.currentActiveIndex < options!.length - 1 ? this.currentActiveIndex++ : options!.length - 1;
                        //@ts-ignore
                        options[this.currentActiveIndex].focus();
                    }
                break;
                case "ArrowUp":
                    this.currentActiveIndex > 0 ? this.currentActiveIndex-- : 0;
                     //@ts-ignore
                     options[this.currentActiveIndex].focus();
                break;
            }
        })
    }
    // Implement `render` to define a template for your element.
    render() {
        return html`
            <div class="select-list">
                <button @click=${this.handleClick}>Abre select</button>
                <div class="select-container">
                    <span class="select-option" tabindex="0">Option 1</span>
                    <span class="select-option" tabindex="0">Option 2</span>
                    <span class="select-option" tabindex="0">Option 3</span>
                    <span class="select-option" tabindex="0">Option 4</span>
                </div>
            </div>
        `
    }
}