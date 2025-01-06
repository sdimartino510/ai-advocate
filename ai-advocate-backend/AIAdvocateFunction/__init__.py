import azure.functions as func

import fastapi
import logging

from .utils import read_json

app = fastapi.FastAPI()


@app.get("/bill/{bill_id}")
async def get_bill(bill_id: int):
    if bill_id == 1702794 :
        sb376_legiscan_json = read_json("AIAdvocateFunction/SB376.json")
        sb376_summary_json = read_json("AIAdvocateFunction/SB376_summary.json")
        return {
            "bill": sb376_legiscan_json,
            "summary": sb376_summary_json,
            "engagement": {
                "upvotes": 0,
                "downvotes": 0,
                "emojis": {
                    "love": 0,
                    "shock": 0,
                    "happy": 0,
                    "sad": 0,
                    "angry": 0,
                },
            },
            "panel" : {
                "verfied": True,
                "thoughts" : ["Thought 1", "Thought 2", "Thought 3"],
                "questions" : ["Question 1", "Question 2", "Question 3"],
                "pros" : ["Pro 1", "Pro 2", "Pro 3"],
                "cons" : ["Con 1", "Con 2", "Con 3"]
            }
        }
    else:
        raise fastapi.HTTPException(status_code=404, detail="Only bill 1702794 is supported")