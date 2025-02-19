import {View, Text} from "react-native"
import { useSearchParams } from "expo-router/build/hooks"
 import Details from "../../assets/components/Details/Details"
 import sample_data from "@/assets/sample_data";

export default function DetailsInfo(){
    const searchParams = useSearchParams();
    const id = searchParams.get('id') ?? "";

    const bill = sample_data.find((bill) => bill.id === id);
    if (!bill) {
        return (
            <View>
                <Text>Bill not found.</Text>
            </View>
        )
    }

    return (
        <Details
            billTitle={bill.title}
            billId={id}
            billStatus={bill.status}
            billDescription={bill.description}

            link={bill.linkLIVE}
            billSummarySimple={bill.billSummarySimple}
            billSummaryMedium={bill.billSummaryMedium}
            billSummaryComplex={bill.billSummaryComplex}
            pros={bill.pros}
            cons={bill.cons}

            numReactions={bill.numReactions}
        />
        // TODO: Interaction data should be synced with bill component or backend.
    )
 }