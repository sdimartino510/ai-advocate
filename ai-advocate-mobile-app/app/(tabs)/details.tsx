 import Details from "../../assets/components/Details/Details"
 export default function DetailsInfo(){
    return (
        <Details
            billTitle= "BILL TITLE"
            billId="418641279"
            billStatus="Enrolled"
            link= "https://www.loveneverfailsus.com/"
            billSummary="A short summary of the bill and what it touches upon. A plain language summary of what the bill aims to do."
            billSummaryMid="Medium level summary"
            billSummaryCom="Complex level summary"
            pro= "pro text from expert"
            con= "con text from expert"
        />
    );
 }