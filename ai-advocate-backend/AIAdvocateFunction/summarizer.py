from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
import os
from pydantic import BaseModel, Field


class SummaryOutput(BaseModel):
    simple_summary: str = Field(..., description="A simple summary of the text.")
    medium_summary: str = Field(..., description="A medium-length summary of the text.")
    complex_summary: str = Field(..., description="A detailed summary of the text.")

def construct_prompts(text_content):
    base_template = """
    Please summarize the following bill in three levels:

    1. Simple: Provide a very simple summary appropriate for reading levels of grades 1 to 4. 
    Do not talk down to them like a kid, but keep it simple and easy to understand.

    2. Medium: Provide a summary appropriate for reading levels of grades 5 to 8.

    3. Complex: Provide a complex summary suitable for reading levels of grades 9 to 12.

    All summaries should not be extremely lengthy.

    Bill to summarize:

    {text}
    """
    prompt = PromptTemplate(
        input_variables=["text"],
        template=base_template
    )
    return prompt.format(text=text_content)

def run_llm(text_content):

    prompt = construct_prompts(text_content)

    # Initialize GPT-4o Mini OpenAI
    azure_llm_mini = ChatOpenAI(
        base_url=os.environ["AZURE_OPENAI_BASE_URL"],
        model_name="gpt-4o-mini",
        api_key=os.environ["AZURE_OPENAI_API_KEY"]
    )
    azure_llm_mini = azure_llm_mini.with_structured_output(SummaryOutput, include_raw=True)
    
    # Get response from GPT-4o Mini OpenAI
    azure_mini_response = azure_llm_mini.invoke(prompt)

    return azure_mini_response["parsed"]