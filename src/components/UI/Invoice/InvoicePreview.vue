<template>
  <div class="pdfTransactionHTMLView" size="A4">
    <table width="100%" style="margin-bottom:0px;">
        <tr>
            <td width='33%' class='biggerTextSize boldText' style=' vertical-align: center; '> </td>
            <td width='34%' align='center' class='biggerTextSize boldText' style=''>Invoice</td>
            <td width='33%' align='right' style=' padding:0px; '>
                <table width='100%'>
                    <tr>
                        <td width='95%' align="right" style='' class='copyPrintNumberClass'>Original for Recipient </td>
                        <td style='padding:1px;' align='left'>
                            <table>
                                <tr>
                                    <td class=' borderLeftForTxn borderRightForTxn borderBottomForTxn borderTopForTxn copyPrintNumberCheckBoxClass' style='border-color: gray;  color:#fffffe;'>O</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td width='95%' align="right" style=''  class='copyPrintNumberClass'>Duplicate for Transporter</td>
                        <td style='padding:1px;' align='left'>
                            <table>
                                <tr>
                                    <td class=' borderLeftForTxn borderRightForTxn borderBottomForTxn borderTopForTxn copyPrintNumberCheckBoxClass' style='border-color: gray;  color:#fffffe;'>O</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td width='95%' align="right" style=''  class='copyPrintNumberClass'>Triplicate for Supplier </td>
                        <td style='padding:1px;' align='left'>
                            <table>
                                <tr>
                                    <td class=' borderLeftForTxn borderRightForTxn borderBottomForTxn borderTopForTxn copyPrintNumberCheckBoxClass' style='border-color: gray;  color:#fffffe;'>O</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table width='100%'>
        <tr>
            <td width='50%' class='vAlignTop noPadding borderTopForTxn borderBottomForTxn borderLeftForTxn borderRightForTxn borderColorGrey'>
                <table width='100%' style='vertical-align: center;' class='  borderBottomForTxn borderColorGrey'>
                    <tr>
                        <td width='100%' style='vertical-align: center' >
                            <p class='biggerTextSize boldText'>Vyapar Tech Solutions</p>
                            <p class='bigTextSize'>Sarjapura Road, Iblur lake,<br/>Bellandur, <br/>Bangalore-560103</p>
                            <p class='bigTextSize'>Phone no.: 9333911911</p>
                            <p class='bigTextSize'>Email: contact@vyaparapp.in</p>
                            <p class='bigTextSize'>GSTIN: 29KAAAA1111ZZZZ</p>
                            <p class='bigTextSize'>State: 29-Karnataka</p>
                        </td>
                    </tr>
                </table>
                <table width='100%'>
                    <tr  style='background-color:#ffffff; color:#000000;'>
                        <td align="left" width="100%">Bill To</td>
                    </tr>
                    <tr class="boldText bigTextSize">
                        <td>{{invoice.customer.customerName}}</td>
                    </tr>
                    <tr>
                        <td>Doddakanahalli,<br/>Bangalore - 560035</td>
                    </tr>
                    <tr>
                        <td>Contact No.: 9916137039</td>
                    </tr>
                    <tr>
                        <td>GSTIN Number: 29KAAAA1111ZBZB</td>
                    </tr>
                    <tr>
                        <td>State: 29-Karnataka</td>
                    </tr>
                </table>
            </td>
            <td width='50%' class='vAlignTop noPadding borderTopForTxn borderBottomForTxn borderRightForTxn borderColorGrey'>
                <table width='100%'>
                    <tr>
                        <td width='50%' class=' borderBottomForTxn  borderRightForTxn '>Invoice No.<br/><b>5</b></td>
                        <td width='50%' class=' borderBottomForTxn '>Date<br/><b>21-02-2018</b></td>
                    </tr>
                    <tr>
                        <td width='50%' class=' borderBottomForTxn  borderRightForTxn '>Place of supply<br/><b>29-Karnataka</b></td>
                        <td width='50%' class=' borderBottomForTxn '>PO date<br/><b>20-02-2018</b></td>
                    </tr>
                    <tr>
                        <td width='50%' class=' borderBottomForTxn  borderRightForTxn '>PO number<br/><b>56</b></td>
                        <td width='50%' class=' borderBottomForTxn '>Transport Name<br/><b>Xyz transporters</b></td>
                    </tr>
                    <tr>
                        <td width='50%' class=' borderBottomForTxn  borderRightForTxn '>Vehicle Number<br/><b>KA05XX1234</b></td>
                        <td width='50%' class=' borderBottomForTxn '>Delivery Date<br/><b>23-02-2018</b></td>
                    </tr>
                    <tr>
                        <td width='50%' class=' borderBottomForTxn  borderRightForTxn '>Delivery location<br/><b>Doddakanahalli </b></td>
                        <td width='50%' class='borderBottomForTxn'></td>
                    </tr>
                    <tr>
                        <td colspan='2' width='100%'>Ship To</td>
                    </tr>
                    <tr>
                        <td colspan='2' width='100%' >DSR Eden Greens,<br/>Carmelaram railway station,<br/>Doddakannalli,<br/>Bangalore - 560035</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table class='txnItemTableForPrint' width='100%' >
        <thead>
        <tr>
            <th   class='borderBottomForTxn   borderLeftForTxn borderRightForTxn  borderColorGrey' width='4.697986577181208%' align='left'>#</th>
            <th   class='borderBottomForTxn   borderLeftForTxn borderRightForTxn  borderColorGrey' width='29.53020134228188%' align='left'>Item name</th>
            <th   class='borderBottomForTxn   borderLeftForTxn borderRightForTxn  borderColorGrey' width='12.080536912751677%' align='left'>HSN/ SAC</th>
            <th   class='borderBottomForTxn   borderLeftForTxn borderRightForTxn  borderColorGrey' width='13.422818791946309%' align='right'>Quantity</th>
            <th   class='borderBottomForTxn   borderLeftForTxn borderRightForTxn  borderColorGrey' width='13.422818791946309%' align='right'>Price/ Unit</th>
            <th   class='borderBottomForTxn   borderLeftForTxn borderRightForTxn  borderColorGrey' width='13.422818791946309%' align='right'>GST</th>
            <th   class='borderBottomForTxn   borderLeftForTxn borderRightForTxn  borderColorGrey' width='13.422818791946309%' align='right'>Amount</th>
        </tr>
        </thead>
        <tr>
            <td  class='borderLeftForTxn borderRightForTxn borderColorGrey'>1</td>
            <td  class='borderLeftForTxn borderRightForTxn borderColorGrey'>
                <p class='noPadding'>Item1</p>
            </td>
            <td  class='borderLeftForTxn borderRightForTxn borderColorGrey' align='left'>885558</td>
            <td  class='borderLeftForTxn borderRightForTxn borderColorGrey' align='right'>20</td>
            <td  class='borderLeftForTxn borderRightForTxn borderColorGrey' align='right'>₹ 2000</td>
            <td  class='borderLeftForTxn borderRightForTxn borderColorGrey' align="right">₹ 7200 (18%)</td>
            <td  class='borderLeftForTxn borderRightForTxn borderColorGrey' align='right'>₹ 47200</td>
        </tr>
        <tr>
            <td  class='borderLeftForTxn borderRightForTxn borderColorGrey'>2</td>
            <td  class='borderLeftForTxn borderRightForTxn borderColorGrey'>
                <p class='noPadding'>Item2</p>
            </td>
            <td  class='borderLeftForTxn borderRightForTxn borderColorGrey' align='left'>53889</td>
            <td  class='borderLeftForTxn borderRightForTxn borderColorGrey' align='right'>10</td>
            <td  class='borderLeftForTxn borderRightForTxn borderColorGrey' align='right'>₹ 500</td>
            <td  class='borderLeftForTxn borderRightForTxn borderColorGrey' align="right">₹ 900 (18%)</td>
            <td  class='borderLeftForTxn borderRightForTxn borderColorGrey' align='right'>₹ 5900</td>
        </tr>
        <tr>
            <td  class=' boldText borderBottomForTxn borderTopForTxn   borderLeftForTxn borderRightForTxn  borderColorGrey'></td>
            <td  class=' boldText borderBottomForTxn borderTopForTxn   borderLeftForTxn borderRightForTxn  borderColorGrey'><b>Total</b></td>
            <td  class=' boldText borderBottomForTxn borderTopForTxn   borderLeftForTxn borderRightForTxn  borderColorGrey' align='right'></td>
            <td  class=' boldText borderBottomForTxn borderTopForTxn   borderLeftForTxn borderRightForTxn  borderColorGrey' align='right'> <b>30</b></td>
            <td  class=' boldText borderBottomForTxn borderTopForTxn   borderLeftForTxn borderRightForTxn  borderColorGrey' align='right'></td>
            <td  class=' boldText borderBottomForTxn borderTopForTxn   borderLeftForTxn borderRightForTxn  borderColorGrey' align='right'><b>₹8100</b></td>
            <td  class=' boldText borderBottomForTxn borderTopForTxn   borderLeftForTxn borderRightForTxn  borderColorGrey' align="right"><b>₹53100</b></td>
        </tr>
    </table>
    <table width='100%'>
        <tr>
            <td width='50%' valign='top' style='padding: 0px' class='borderBottomForTxn  borderRightForTxn borderLeftForTxn borderColorGrey'>
                <table width='100%'>
                    <tr>
                        <td width='100%'>Invoice Amount In Words</td>
                    </tr>
                    <tr>
                        <td width='100%' class='boldText'>Fifty Three Thousand One Hundred  only</td>
                    </tr>
                    <tr>
                        <td width='100%' class='borderTopForTxn borderColorGrey' >Description</td>
                    </tr>
                    <tr>
                        <td width='100%' class='boldText'>Items to be delivered in next 3 days. Balance will be paid on delivery.</td>
                    </tr>
                </table>
            </td>
            <td width='50%' valign='top' style=' padding: 0px;' class='borderBottomForTxn  borderRightForTxn borderColorGrey'>
                <table width='100%'>
                    <tr>
                        <th align='left' width='50%'> Amounts:</th>
                        <th width='50%'></th>
                    </tr>
                    <tr>
                        <td>Sub Total</td>
                        <td align='right'>₹ 53100</td>
                    </tr>
                    <tr>
                        <td class='borderTopForTxn borderColorGrey'>Total</td>
                        <td align='right' class='borderTopForTxn borderColorGrey'>₹ 53100</td>
                    </tr>
                    <tr>
                        <td>Received</td>
                        <td align='right'>₹ 50000</td>
                    </tr>
                    <tr>
                        <td class='borderTopForTxn borderColorGrey'>Balance</td>
                        <td align='right' class='borderTopForTxn borderColorGrey'>₹ 3100</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table width='100%'>
        <tr>
            <th rowspan='2' width='24.390243902439025%'  class='borderBottomForTxn borderRightForTxn borderLeftForTxn borderColorGrey'  align='center'>HSN/ SAC</th>
            <th rowspan='2' width='17.073170731707318%'  class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='center'>Taxable amount</th>
            <th colspan='2' width='19.512195121951223%'  class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='center'>CGST</th>
            <th colspan='2' width='19.512195121951223%'  class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='center'>SGST</th>
            <th rowspan='2' width='19.512195121951223%'  class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='center'>Total Tax Amount</th>
        </tr>
        <tr>
            <th width='0%'  class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='center'> Rate</th>
            <th width='0%'  class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='center'>Amount</th>
            <th width='0%'  class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='center'> Rate</th>
            <th width='0%'  class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='center'>Amount</th>
        </tr>
        <tr>
            <td  class='borderBottomForTxn borderRightForTxn borderLeftForTxn borderColorGrey' >53889</td>
            <td  class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>₹ 5000</td>
            <td   class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>9%</td>
            <td   class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>₹ 450</td>
            <td   class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>9%</td>
            <td   class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>₹ 450</td>
            <td   class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>₹ 900</td>
        </tr>
        <tr>
            <td  class='borderBottomForTxn borderRightForTxn borderLeftForTxn borderColorGrey' >885558</td>
            <td  class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>₹ 40000</td>
            <td   class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>9%</td>
            <td   class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>₹ 3600</td>
            <td   class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>9%</td>
            <td   class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>₹ 3600</td>
            <td   class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>₹ 7200</td>
        </tr>
        <tr class='boldText'>
            <td  class='borderBottomForTxn borderRightForTxn borderLeftForTxn borderColorGrey'  align='right'>Total</td>
            <td  class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>₹ 45000</td>
            <td   class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'></td>
            <td   class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>₹ 4050</td>
            <td   class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'></td>
            <td   class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>₹ 4050</td>
            <td   class='borderBottomForTxn borderRightForTxn borderColorGrey'  align='right'>₹ 8100</td>
        </tr>
    </table>
    <table width='100%'>
        <tr>
            <td width='50%' class='borderBottomForTxn borderLeftForTxn borderColorGrey vAlignBottom noPadding'>
                <table width='100%'>
                    <tr>
                        <th align="left" width="100%"> Terms and conditions:</th>
                    </tr>
                    <tr>
                        <td width="100%">We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct. </td>
                    </tr>
                </table>
                <table width='100%'>
                   
                   
                </table>
            </td>
            <td width='50%' class='borderBottomForTxn borderRightForTxn borderColorGrey vAlignBottom noPadding'>
                <table width='100%'>
                    <tr>
                        <td width='100%' class='borderTopForTxn borderLeftForTxn borderColorGrey noPadding'>
                            <table width='100%'>
                                <tr>
                                    <td width='100%' style="text-align:center;" align="center">For, Vyapar Tech Solutions</td>
                                </tr>
                                <tr>
                                    
                                </tr>
                                <tr>
                                    <td align="center" style="text-align:center;" >Authorized Signatory</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
 <table width='100%'>
        <tr>
            <td width='100%' align='center'>This is a Computer Generated Invoice (Powered by Store 360 App)</td>
        </tr>
    </table>
</div>
</template>

<script>
export default {
  props: ['invoice']
}
</script>

<style lang="scss" scoped>
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
</style>