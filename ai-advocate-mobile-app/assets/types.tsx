type Status<String> = 'Introduced' | 'Engrossed' | 'Enrolled' | 'Passed' | 'Vetoed'

type Topic = "Violence" | "Education" | "Housing" | "Protection" | "Victim" | "Gun Control" | "Support" | "Gender" | "Harrassment"

type BillInfo = {
    billTitle: string,
    billId: string,
    billStatus: Status,
    billDescription: string,

    numUpvotes?: number,
    numDownvotes?: number,
    numReactions: number,
    saved?: boolean,
    reactionID?: number, // TODO: Initialize with user's reaction.
}

export type { Status, Topic, BillInfo }