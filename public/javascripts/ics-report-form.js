(function() {
    window.IcsReportForm = function(obj) {
        this.nodeElement = obj.el || document.body;
        this.appWidth = document.body.clientWidth;
        this.tableWidth = 0;
        this.cellWidth = 0;
        this.reportData = obj;
    };

    /*-------------------------------------------------------------------------------------------------*/
    /* Main onstruction functions */

    IcsReportForm.prototype.createReport = function(obj) { // main
        if (!obj) {
            throw 'Validation error: data not found';
        } else {
            this.oReportFormCss();
            this.createHeader(obj.header);
            this.createBody(obj.body);
            this.createFooter(obj.footer);
        }
    };

    IcsReportForm.prototype.createHeader = function(headerData) { // header
        if (!headerData) {
            throw 'Validation error: obj.header not found';
        } else {
            this.oHeaderCss();
            let header = document.createElement('div');
            let title = document.createElement('div');
            let info = document.createElement('div');

            header.className = 'report-header';
            // header.id = 'header';
            title.className = 'report-header-title';
            info.className = 'report-header-info';

            this.nodeElement.appendChild(header);
            header.appendChild(title);
            header.appendChild(info);
            title.innerHTML = headerData.title;
            info.innerHTML = '地 区： ' + headerData.district + '&emsp;&emsp;生成时间： ' + headerData.time;

        }
    };

    IcsReportForm.prototype.createBody = function(bodyData) { // body
        if (!bodyData) {
            throw 'Validation error: obj.body not found';
        } else {
            this.oBodyCss();
            let body = document.createElement('div');
            body.className = 'report-body';
            this.nodeElement.appendChild(body);
            this.createIntroduction(body, bodyData.introduction);
            this.createTotalStatus(body, bodyData.totalStatus);
            this.createRiskStatus(body, bodyData.riskStatus);
            this.createBugDetails(body, bodyData.bugDetails);
            this.createConclusion(body, bodyData.conclusion);

        }
    };

    IcsReportForm.prototype.createFooter = function(footerData) { // footer
        if (!footerData) {
            throw 'Validation error: obj.footer not found';
        } else {
            this.oFooterCss();
            let footer = document.createElement('div');
            footer.className = 'report-footer';
            this.nodeElement.appendChild(footer);



        }
    };

    /*-------------------------------------------------------------------------------------------------*/
    /* Base construction functions */

    IcsReportForm.prototype.createIntroduction = function(body, introductionData) { // body.introduction
        if (!introductionData) {
            throw 'Validation error: obj.body.introduction not found';
        } else {
            this.oIntroductionCss();
            let introduction = document.createElement('div');
            introduction.className = 'report-body-introduction';
            body.appendChild(introduction);
            this.createSubtitle(introduction, introductionData.subtitle);

            for (let i = 0; i < introductionData.description.length; i++) {
                let rowElem = document.createElement('div');
                rowElem.className = 'i-row';
                if (i % 2 === 0) {
                    rowElem.className += ' i-double';
                }
                introduction.appendChild(rowElem);
                let colElemLeft = document.createElement('div');
                colElemLeft.className = 'i-col-left';
                colElemLeft.innerHTML = introductionData.description[i].field;
                rowElem.appendChild(colElemLeft);

                let colElemRight = document.createElement('div');
                colElemRight.className = 'i-col-right';
                colElemRight.innerHTML = introductionData.description[i].val;
                rowElem.appendChild(colElemRight);
            }
        }
    };


    IcsReportForm.prototype.createTotalStatus = function(body, totalStatusData) {
        if (!totalStatusData) {
            throw 'Validation error: obj.body.totalStatus not found';
        } else {
            this.oTotalStatusCss();
            let totalStatus = document.createElement('div');
            totalStatus.className = 'report-body-totalStatus';
            body.appendChild(totalStatus);
            this.createSubtitle(totalStatus, totalStatusData.subtitle);

        }

    };

    IcsReportForm.prototype.createRiskStatus = function(body, riskStatusData) {
        if (!riskStatusData) {
            throw 'Validation error: obj.body.totalStatus not found';
        } else {
            this.oriskStatusCss();
            let riskStatus = document.createElement('div');
            riskStatus.className = 'report-body-riskStatus';
            body.appendChild(riskStatus);
            this.createSubtitle(riskStatus, riskStatusData.subtitle);

        }
    };

    IcsReportForm.prototype.createBugDetails = function(body, bugDetailsData) {
        if (!bugDetailsData) {
            throw 'Validation error: obj.body.totalStatus not found';
        } else {
            this.obugDetailsCss();
            let bugDetails = document.createElement('div');
            bugDetails.className = 'report-body-bugDetails';
            body.appendChild(bugDetails);
            this.createSubtitle(bugDetails, bugDetailsData.subtitle);

        }
    };

    IcsReportForm.prototype.createConclusion = function(body, conclusionData) {
        if (!conclusionData) {
            throw 'Validation error: obj.body.totalStatus not found';
        } else {
            this.oConclusionCss();
            let conclusion = document.createElement('div');
            conclusion.className = 'report-body-conclusion';
            body.appendChild(conclusion);
            this.createSubtitle(conclusion, conclusionData.subtitle);

        }
    };


    IcsReportForm.prototype.createForm = function(obj) { // body.form
        this.createTableHead();
        this.createTable(obj);
    };

    IcsReportForm.prototype.createTableHead = function() { // body.form.head
    };

    IcsReportForm.prototype.createTable = function(obj) { // body.form.table
        if (!obj) {
            throw 'Please set the number of rows or columns, arg[obj]';
        } else {
            // create a form
            this.cellWidth = this.tableWidth / obj.col;
            this.oTableCss();
            for (let i = 0; i < obj.row; i++) {
                let rowElem = document.createElement('div');
                rowElem.className = 't-row';
                if (i % 2 === 0) {
                    rowElem.className += ' t-double';
                }
                this.nodeElement.appendChild(rowElem);

                for (let i = 0; i < obj.col; i++) {
                    let colElem = document.createElement('div');
                    colElem.className = 't-col';
                    rowElem.appendChild(colElem);

                }
            }
        }
    };

    IcsReportForm.prototype.createSubtitle = function(node, subtitle) {
        let subtitleElem = document.createElement('div');
        subtitleElem.className = 'report-body-subtitle';
        node.appendChild(subtitleElem);
        subtitleElem.innerHTML = subtitle;
    };

    IcsReportForm.prototype.createHorizontalLine = function() {

    };


    /*-------------------------------------------------------------------------------------------------*/
    /* Style functions */


    IcsReportForm.prototype.oReportFormCss = function() { // main css        
        this.nodeElement.className = 'report-container';
        let css = document.getElementsByTagName("style")[0];
        if (!css) {
            css = document.createElement("style");
            document.head.appendChild(css);
        }
        css.innerText += ' body {display: flex; font: \"微软雅黑\", \"Times New Roman\";}';
        css.innerText += ' .report-container {margin: 100px; width: ' + this.appWidth + 'px; min-height: 200px; justify-content: center; vertical-align: center; background: #FFFFFF; border-radius: 10px; box-shadow: 0px 0px 5px #999999}';

    };

    IcsReportForm.prototype.oHeaderCss = function() { // header css
        let css = document.getElementsByTagName("style")[0];
        if (!css) {
            css = document.createElement("style");
            document.head.appendChild(css);
        }
        css.innerText += ' .report-header {padding: 20px 50px; width: 100%; background: #EEEEEE; border-radius: 10px;}';
        css.innerText += ' .report-header-title {width: 100%; padding: 10px; font-size: 32px; text-align: center;}';
        css.innerText += ' .report-header-info {width: 100%; padding: 10px; font-size: 18px; text-align: center; color: #999999;}';

    };

    IcsReportForm.prototype.oBodyCss = function() { // body css
        let css = document.getElementsByTagName("style")[0];
        if (!css) {
            css = document.createElement("style");
            document.head.appendChild(css);
        }

        css.innerText += ' .report-body {padding: 20px 50px;}';
        css.innerText += ' .report-body-subtitle {font-size: 24px; padding: 20px; border-bottom: 1px solid #999999;}';
    };

    IcsReportForm.prototype.oIntroductionCss = function() { // body css
        let css = document.getElementsByTagName("style")[0];
        if (!css) {
            css = document.createElement("style");
            document.head.appendChild(css);
        }

        css.innerText += ' .report-body-introduction {display: flex; flex-direction: column; margin-bottom: 20px;}';
        css.innerText += ' .i-row {display: flex; width: 100%; border-bottom: 1px solid #999999; background: #F0FFFF}';
        css.innerText += ' .i-col-left {width: 350px; padding: 6px 20px; font-size: 18px}';
        css.innerText += ' .i-col-right {flex: 1 1 auto; padding: 6px 20px; font-size: 18px}';
        css.innerText += ' .i-double {background: #87CEFA;}';

    };

    IcsReportForm.prototype.oTotalStatusCss = function() {
        let css = document.getElementsByTagName("style")[0];
        if (!css) {
            css = document.createElement("style");
            document.head.appendChild(css);
        }

        css.innerText += ' ';
    };

    IcsReportForm.prototype.oriskStatusCss = function() {
        let css = document.getElementsByTagName("style")[0];
        if (!css) {
            css = document.createElement("style");
            document.head.appendChild(css);
        }

        css.innerText += ' ';
    };

    IcsReportForm.prototype.obugDetailsCss = function() {
        let css = document.getElementsByTagName("style")[0];
        if (!css) {
            css = document.createElement("style");
            document.head.appendChild(css);
        }

        css.innerText += ' ';
    };

    IcsReportForm.prototype.oConclusionCss = function() {
        let css = document.getElementsByTagName("style")[0];
        if (!css) {
            css = document.createElement("style");
            document.head.appendChild(css);
        }

        css.innerText += ' ';
    };














    IcsReportForm.prototype.oFooterCss = function() { // footer css
        let css = document.getElementsByTagName("style")[0];
        if (!css) {
            css = document.createElement("style");
            document.head.appendChild(css);
        }

        css.innerText += ' ';
    };

    IcsReportForm.prototype.oTableCss = function() {

        // fetch style element
        let css = document.getElementsByTagName("style")[0];
        if (!css) {
            css = document.createElement("style");
            document.head.appendChild(css);
        }

        css.innerText += ' .t-row {width: 100%; height: 30px; background: #EEEEEE;}';
        css.innerText += ' .t-double {width: 100%; height: 30px; background: #FFFFFF;}';
        css.innerText += ' .t-col {float: left; width: ' + this.cellWidth + 'px; height: 100%;border: 1px solid #999999;}';

    }


})();