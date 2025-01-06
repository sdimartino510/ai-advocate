# API Documentation

This API provides two main endpoints:  
1. `/summarize` - Summarize a bill based on the provided link.  
2. `/bill/{bill_id}` - Retrieve a bill based on its ID.

## Endpoints

### 1. **Summarize Bill**
**Endpoint:** `GET /summarize`  
**Description:** This endpoint takes a link to a bill and returns a summary.  

**Parameters:**  
- `bill_link` (required): A string containing the URL of the bill to summarize.

**Responses:**  
- **200 (Success):**  
  - Returns a JSON object containing the summary of the bill.  


**Environment Variables Required:**  
To run the `/summarize` endpoint, you need to configure the following environment variables:  
- `AZURE_OPENAI_BASE_URL`: The base URL for Azure OpenAI API.  
- `AZURE_OPENAI_API_KEY`: The API key for Azure OpenAI.  

**Setup Instructions for Environment Variables:**  
1. Obtain a test key by using GitHub models.
2. Store the variables in a `mise.local.toml` file in the following format:  
   ```toml
   [env]
   AZURE_OPENAI_BASE_URL = "your_azure_openai_base_url"
   AZURE_OPENAI_API_KEY = "your_azure_openai_api_key"
   ```
3. **Do not push this file to the repository**

### 2. **Get Bill**
**Endpoint:** `GET /bill/{bill_id}`  
**Description:** This endpoint takes a bill id and returns the complete bill info required by the app.  

**Parameters:**  
- `bill_id` (required): A string containing the bill id.

**Responses:**  
- **200 (Success):**  
  - Returns a JSON object containing the bill info.  