(function () {
  window.IcsReportForm = function (obj) {
    this.nodeElement = obj.el || document.body;
    this.appWidth = document.body.clientWidth - 250;
  };

  /*-------------------------------------------------------------------------------------------------*/
  /* Main onstruction functions */

  IcsReportForm.prototype.createReport = function (data) { // main
    if (!data) {
      throw 'Validation error: data not found';
    } else {
      this.oReportFormCss(this.appWidth);
      this.createHeader(data.header);
      this.createBody(data.body);
      this.createFooter(data.footer);
    }
  };

  IcsReportForm.prototype.createHeader = function (headerData) { // header
    if (!headerData) {
      throw 'Validation error: obj.header not found';
    } else {

      let header = document.createElement('div');
      let title = document.createElement('div');
      let info = document.createElement('div');

      header.className = 'report-header';
      // header.id = 'header';
      title.className = 'report-header-title';
      info.className = 'report-header-info';

      this.nodeElement.appendChild(header);
      this.oHeaderCss(header.appWidth);
      header.appendChild(title);
      header.appendChild(info);
      title.innerHTML = headerData.title;
      info.innerHTML = '地 区： ' + headerData.district;

    }
  };

  IcsReportForm.prototype.createBody = function (bodyData) { // body
    if (!bodyData) {
      throw 'Validation error: obj.body not found';
    } else {
      let body = document.createElement('div');
      body.className = 'report-body';
      this.nodeElement.appendChild(body);
      this.oBodyCss(body.clientWidth);
      this.createIntroduction(body, bodyData.introduction);
      this.createTotalStatus(body, bodyData.totalStatus);
      this.createRiskStatus(body, bodyData.riskStatus);
      this.createBugDetails(body, bodyData.bugDetails);
      this.createConclusion(body, bodyData.conclusion);

    }
  };

  IcsReportForm.prototype.createFooter = function (footerData) { // footer
    if (!footerData) {
      throw 'Validation error: obj.footer not found';
    } else {
      this.oFooterCss();
      let footer = document.createElement('div');
      let exportTime = document.createElement('div');
      let message = document.createElement('div');

      footer.className = 'report-footer';
      exportTime.className = 'report-footer-exportTime';
      message.className = 'report-footer-message';

      this.nodeElement.appendChild(footer);
      footer.appendChild(exportTime);
      footer.appendChild(message);

      exportTime.innerHTML = '报表导出时间： ' + footerData.time;
      message.innerHTML = footerData.msg;

    }
  };

  /*-------------------------------------------------------------------------------------------------*/
  /* Base construction functions */

  IcsReportForm.prototype.createIntroduction = function (node, introductionData) { // body.introduction
    if (!introductionData) {
      throw 'Validation error: obj.body.introduction not found';
    } else {
      this.oIntroductionCss(node.clientWidth);
      let introduction = document.createElement('div');
      introduction.className = 'report-body-introduction';
      node.appendChild(introduction);
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


  IcsReportForm.prototype.createTotalStatus = function (node, totalStatusData) {
    if (!totalStatusData) {
      throw 'Validation error: obj.body.totalStatus not found';
    } else {
      this.oTotalStatusCss(node.clientWidth);
      let totalStatus = document.createElement('div');
      totalStatus.className = 'report-body-totalStatus';
      node.appendChild(totalStatus);
      this.createSubtitle(totalStatus, totalStatusData.subtitle);
      this.createTable(totalStatus, totalStatusData.data);

    }

  };

  IcsReportForm.prototype.createRiskStatus = function (node, riskStatusData) {
    if (!riskStatusData) {
      throw 'Validation error: obj.body.totalStatus not found';
    } else {
      this.oRiskStatusCss(node.clientWidth);
      let riskStatus = document.createElement('div');
      riskStatus.className = 'report-body-riskStatus';
      node.appendChild(riskStatus);
      this.createSubtitle(riskStatus, riskStatusData.subtitle);

    }
  };

  IcsReportForm.prototype.createBugDetails = function (node, bugDetailsData) {
    if (!bugDetailsData) {
      throw 'Validation error: obj.body.totalStatus not found';
    } else {
      this.oBugDetailsCss(node.clientWidth);
      let bugDetails = document.createElement('div');
      bugDetails.className = 'report-body-bugDetails';
      node.appendChild(bugDetails);

      this.createSubtitle(bugDetails, bugDetailsData.subtitle);
      this.createTable(bugDetails, bugDetailsData.data);

    }
  };

  IcsReportForm.prototype.createConclusion = function (node, conclusionData) {
    if (!conclusionData) {
      throw 'Validation error: obj.body.totalStatus not found';
    } else {
      this.oConclusionCss();
      let conclusion = document.createElement('div');
      conclusion.className = 'report-body-conclusion';
      node.appendChild(conclusion);
      this.createSubtitle(conclusion, conclusionData.subtitle);

    }
  };


  /*-------------------------------------------------------------------------------------------------*/
  /* Factory functions */

  IcsReportForm.prototype.createSubtitle = function (node, subtitle) {
    let subtitleElem = document.createElement('div');
    subtitleElem.className = 'report-body-subtitle';
    node.appendChild(subtitleElem);
    subtitleElem.innerHTML = subtitle;
  };

  IcsReportForm.prototype.createTable = function (node, data) {
    if (!data) {
      throw 'Validation error: data not found';
    } else {
      let flag = data.tableFlag;
      this.oTableCss(flag, node.clientWidth, data.op.col);

      let table = document.createElement('div');
      table.className = flag + '-table-container';
      node.appendChild(table);

      let col = data.head.length;
      let row = data.content.length;

      let headElem = document.createElement('div');
      headElem.className = flag + '-head';
      table.appendChild(headElem);
      for (let i = 0; i < col; i++) {
        let colElem = document.createElement('div');
        colElem.className = flag + '-col';
        colElem.className += ' ' + flag + '-col-' + i;
        colElem.innerHTML = data.head[i];
        headElem.appendChild(colElem);
      }

      for (let i = 0; i < row; i++) {
        let rowElem = document.createElement('div');
        rowElem.className = flag + '-row';
        if ((i + 1) % 2 === 0) {
          rowElem.className += ' ' + flag + '-double';
        }
        table.appendChild(rowElem);

        for (let j = 0; j < col; j++) {
          let colElem = document.createElement('div');
          colElem.className = flag + '-col';
          colElem.className += ' ' + flag + '-col-' + j;
          colElem.innerHTML = data.content[i][j];
          rowElem.appendChild(colElem);

        }
      }
    }
  };



  /*-------------------------------------------------------------------------------------------------*/
  /* Style functions */


  IcsReportForm.prototype.oReportFormCss = function (nodeWidth) { // main css
    this.nodeElement.className = 'report-container';
    let css = document.getElementsByTagName("style")[0];
    if (!css) {
      css = document.createElement("style");
      document.head.appendChild(css);
    }
    css.innerText += ' body {min-width: 1000px; font: \"微软雅黑\", \"Times New Roman\"; box-sizing: border-box; justify-content: center;}';
    css.innerText += ' .report-container {margin: 100px auto; width: ' + nodeWidth + 'px; min-height: 200px; justify-content: center; vertical-align: center; background: #FFFFFF; border-radius: 10px; box-shadow: 0px 0px 5px #999999}';

  };

  IcsReportForm.prototype.oHeaderCss = function (nodeWidth) { // header css
    let css = document.getElementsByTagName("style")[0];
    if (!css) {
      css = document.createElement("style");
      document.head.appendChild(css);
    }
    css.innerText += ' .report-header {padding: 20px 50px; width: ' + nodeWidth + 'px; background: #F0FFFF; border-radius: 10px;}';
    css.innerText += ' .report-header-title {width: 100%; padding: 10px; font-size: 32px; text-align: center;}';
    css.innerText += ' .report-header-info {width: 100%; padding: 10px; font-size: 18px; text-align: center; color: #999999;}';

  };

  IcsReportForm.prototype.oBodyCss = function (nodeWidth) { // body css
    let css = document.getElementsByTagName("style")[0];
    if (!css) {
      css = document.createElement("style");
      document.head.appendChild(css);
    }

    css.innerText += ' .report-body {padding: 20px 50px; width: ' +nodeWidth + 'px;}';
    css.innerText += ' .report-body-subtitle {font-size: 24px; padding: 20px; border-bottom: 1px solid #999999;}';
  };

  IcsReportForm.prototype.oFooterCss = function () { // footer css
    let css = document.getElementsByTagName("style")[0];
    if (!css) {
      css = document.createElement("style");
      document.head.appendChild(css);
    }

    css.innerText += ' .report-footer {padding: 0px 50px; padding-bottom: 20px; display: flex; justify-content: space-between; color: #999999;}';
  };

  IcsReportForm.prototype.oIntroductionCss = function () { // body.introduction css
    let css = document.getElementsByTagName("style")[0];
    if (!css) {
      css = document.createElement("style");
      document.head.appendChild(css);
    }

    css.innerText += ' .report-body-introduction {display: flex; flex-direction: column; margin-bottom: 20px;}';
    css.innerText += ' .i-row {display: flex; width: 100%; border-bottom: 1px solid #999999; background: #FFFFFF;}';
    css.innerText += ' .i-col-left {height: 100%; width: 250px; padding: 6px 20px; font-size: 16px;}';
    css.innerText += ' .i-col-right {height: 100%; flex: 1 1 auto; padding: 6px 20px; font-size: 16px;}';
    css.innerText += ' .i-double {background: #EEEEEE;}';

  };

  IcsReportForm.prototype.oTotalStatusCss = function () { // body.totalStatus css
    let css = document.getElementsByTagName("style")[0];
    if (!css) {
      css = document.createElement("style");
      document.head.appendChild(css);
    }

    css.innerText += ' ';
  };

  IcsReportForm.prototype.oRiskStatusCss = function () { // body.riskStatus css
    let css = document.getElementsByTagName("style")[0];
    if (!css) {
      css = document.createElement("style");
      document.head.appendChild(css);
    }

    css.innerText += ' ';
  };

  IcsReportForm.prototype.oBugDetailsCss = function () { // body.bugDetails css
    let css = document.getElementsByTagName("style")[0];
    if (!css) {
      css = document.createElement("style");
      document.head.appendChild(css);
    }

    css.innerText += ' ';
  };

  IcsReportForm.prototype.oConclusionCss = function () { // body.conclusion css
    let css = document.getElementsByTagName("style")[0];
    if (!css) {
      css = document.createElement("style");
      document.head.appendChild(css);
    }

    css.innerText += ' ';
  };


  IcsReportForm.prototype.oTableCss = function (flag, tWidth, cWidths) { // table css

    // fetch style element
    let css = document.getElementsByTagName("style")[0];
    if (!css) {
      css = document.createElement("style");
      document.head.appendChild(css);
    }

    // calculate colWidth
    let sum = 0;
    for (let i = 0; i < cWidths.length; i++) {
      sum += parseFloat(cWidths[i]);
      console.log(sum);
    }

    css.innerText += ' .' + flag + '-table-container {border-top: 1px solid #999999; border-bottom: 1px solid #999999;}';
    css.innerText += ' .' + flag + '-head {width: 100%; height: 30px; background: #BBBBBB;}';
    css.innerText += ' .' + flag + '-row {width: 100%; height: 30px; background: #EEEEEE;}';
    css.innerText += ' .' + flag + '-double {width: 100%; height: 30px; background: #FFFFFF;}';
    css.innerText += ' .' + flag + '-col {float: left; height: 100%;}';

    for (let i = 0; i < cWidths.length; i++) {
      let cWidth = ((tWidth - 2) * cWidths[i]) / sum;
      css.innerText += ' .' + flag + '-col-' + i + ' { width: ' + cWidth + 'px;}';
    }

  }


})();
