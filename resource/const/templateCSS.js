var template1 = `

.pdfTransactionHTMLView {
    display: block;
    padding: 20px 30px;
  }
  @media print {
    body {
      -webkit-print-color-adjust: exact;
    }
  }
  .txnItemTableForPrint table {
    page-break-after: auto;
  }
  .txnItemTableForPrint tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }
  .txnItemTableForPrint td {
    page-break-inside: avoid;
    page-break-after: auto;
  }
  .txnItemTableForPrint thead {
    display: table-header-group;
  }
  .pdfTransactionHTMLView table {
    border-collapse: collapse;
  }
  .pdfTransactionHTMLView td,
  .pdfTransactionHTMLView th {
    padding: 3.2000000000000006px;
    font-size: 10.240000000000002px;
  }
  .pdfTransactionHTMLView .borderBottomForTxn {
    border-bottom: 1px solid;
    border-color: gray;
  }
  .pdfTransactionHTMLView .borderTopForTxn {
    border-top: 1px solid;
    border-color: gray;
  }
  .pdfTransactionHTMLView .borderLeftForTxn {
    border-left: 1px solid;
    border-color: gray;
  }
  .pdfTransactionHTMLView .borderRightForTxn {
    border-right: 1px solid;
    border-color: gray;
  }
  .pdfTransactionHTMLView .borderColorGrey {
    border-color: gray;
  }
  .pdfTransactionHTMLView p {
    margin: 0;
    padding: 1.2800000000000002px;
    font-size: 10.240000000000002px;
  }
  .pdfTransactionHTMLView .paddingLeft {
    padding-left: 3.2000000000000006px;
  }
  .pdfTransactionHTMLView .paddingRight {
    padding-right: 3.2000000000000006px;
  }
  .pdfTransactionHTMLView .discountTaxTable {
    border-bottom: 0px;
    border-color: white;
  }
  .pdfTransactionHTMLView .boldText {
    font-weight: bold;
  }
  .pdfTransactionHTMLView .copyPrintNumberClass {
    padding: 1.6000000000000003px;
    padding-right: 0px;
    font-size: 6.400000000000001px;
  }
  .pdfTransactionHTMLView .copyPrintNumberCheckBoxClass {
    padding: 0px;
    font-size: 9.600000000000001px;
  }
  .pdfTransactionHTMLView .normalTextSize {
    font-size: 8.320000000000002px;
  }
  .pdfTransactionHTMLView .bigTextSize {
    font-size: 9.600000000000001px;
  }
  .pdfTransactionHTMLView .largerTextSize {
    font-size: 11.520000000000003px;
  }
  .pdfTransactionHTMLView .biggerTextSize {
    font-size: 13.440000000000003px;
  }
  .pdfTransactionHTMLView .extraLargeTextSize {
    font-size: 15.360000000000003px;
  }
  .pdfTransactionHTMLView .noTopPadding {
    padding-top: 0px;
  }
  .pdfTransactionHTMLView .noBottomPadding {
    padding-bottom: 0px;
  }
  .pdfTransactionHTMLView .noPadding {
    padding: 0px;
  }
  .pdfTransactionHTMLView .topPadding {
    padding-top: 3.2000000000000006px;
  }
  .pdfTransactionHTMLView .partyAddressPadding {
    margin: 0;
    padding: 1.9200000000000004px 32.00000000000001px;
  }
  .pdfTransactionHTMLView .vAlignTop {
    vertical-align: top;
  }
  .pdfTransactionHTMLView .vAlignBottom {
    vertical-align: bottom;
  }
  .pdfTransactionHTMLView {
    font-family: Segoe, "Segoe UI", Calibri, Candara, Optima, Arial, sans-serif;
  }
  .page-break {
    page-break-after: always;
  }
  .pay-online-upi {
    cursor: default;
    clear: both;
    float: left;
    background-color: #28db89;
    padding: 1px;
  }
  .pay-online-upi .upi-image {
    display: inline-block;
    padding: 2px;
    background-color: white;
  }
  .pay-online-upi .pay-now-text {
    border-radius: 0 2px 2px 0;
    display: inline-block;
    padding: 3px 2px 3px 2px;
    color: white;
  }
`;

var template2 = `.printHTMLView h1, .printHTMLView p {
  font-family: Segoe, "Segoe UI", Calibri, Candara, Optima, Arial, sans-serif !important;
}

.flex{
  display:flex;
}

h1, p{
  margin:0px;
}

h1{
  font-size: 24px
}

.align-left {
  text-align: left;
}
.align-center {
  text-align: center;
}
.align-right {
  text-align: right;
}
.address-wrapper, .total-wrapper {
  justify-content: space-between;
  padding: 15px 25px;
  border-bottom: 1px solid #000;
}
.title-wrapper {
  text-align: center;
  padding: 15px 25px 0px 25px;
}
.title-wrapper h1 {
  text-decoration: underline;
}
.items-wrapper {
  padding: 25px 0px;
  border-bottom: 1px solid #000;
}
.items-wrapper .title p {
  font-weight: bold;
}
.items-wrapper div {
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: 25px auto 100px 100px 70px 100px;
  padding: 0px 25px;
}

.header {
  padding: 10px;
  text-align: center;
  background-color: rgb(239, 71, 71);
  align-items: flex-end;
}

.header h1, .header p {
  color: white;
}

.header h1 {
  font-size: 32px;
}
.header p {
  font-size: 14px;
}
.address-wrapper {
  border-bottom: 1px solid black;
}
.footer-wrapper {
  padding: 25px;
  display: grid;
  grid-template-columns: 60% 30%;
  align-items: center;
}
.footer-wrapper li p {
  font-size: 12px;
}

` 

function getTemplateCSS(i){
    switch(i){
        case 1:
            return template1
        case 2:
            return template2
        default:
            return ``
    }
}

export default getTemplateCSS;