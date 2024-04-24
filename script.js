class ProgressBar {
    templates = {};
    loading = false;
    loadingPercent = 0;
    root = null;
    constructor(node) {
        this.root = node;
        document.querySelectorAll("[data-template-for]").forEach((template) => {
            this.templates[template.dataset.templateId] = template;
        });
        this.addEventListener();
        this.render();
    }
    getProgressBarBtn() {
        return this.root.querySelector(".progressbar-btn");
    }
    resetProgressBar() {
        this.getProgressBarBtn().innerHTML = "";
    }
    toggleCssForProgressBarBtn() {
        this.getProgressBarBtn().classList.toggle("not-allowed");
        this.root.querySelector(".cover-btn").classList.toggle("not-allowed");
    }
    render() {
        const progressBarBtn = this.getProgressBarBtn();
        this.resetProgressBar();
        if (!this.loading) {
            progressBarBtn.appendChild(
                this.templates.progressLoad.content.cloneNode(true)
            );
        } else {
            if (this.loadingPercent < 100) {
                progressBarBtn.appendChild(
                    this.templates.progressLoading.content.cloneNode(true)
                );
            } else {
                progressBarBtn.appendChild(
                    this.templates.progressComplete.content.cloneNode(true)
                );

            }
            this.setCoverBtnWidth();
        }
    }
    setCoverBtnWidth = () => {
        this.root.querySelector(".cover-btn").style.width = this.loadingPercent + "%";
    }
    addEventListener = () => {
        this.root.addEventListener("click", this.handleClick);
    }
    handleClick = () => {
        if (this.loading) {
            return;
        }
        this.initiateLoading();

    }
    initiateLoading() {
        if (this.loadingPercent === 100) {
            this.getProgressBarBtn().innerHTML = "";
        }
        this.loading = true;
        if (this.loading) {
            this.toggleCssForProgressBarBtn();
        }
        this.timer = setInterval(this.setLoading, 200);
    }
    setLoading = () => {
        if (this.loadingPercent < 100) {
            this.loadingPercent += 5;
            this.render();
        } else {
            clearInterval(this.timer);
            this.loadingPercent = 0;
        }
    }
}

function createProgressBar() {
    document
        .querySelectorAll("[data-componentId='progressBarSection']")
        .forEach((node) => {
            new ProgressBar(node);
        });
}
createProgressBar();