# app/main.py
from fastapi import FastAPI, HTTPException, Body
from typing import List, Dict
import pandas as pd
from app.features.vnwqi_calculation.dss1_main import calculate_wqi_for_df
from app.features.vnwqi_prediction.main import predict
from pydantic import BaseModel

app = FastAPI()

class BatchWQIInput(BaseModel):
    data: List[Dict]

@app.post("/calculate_wqi_batch")
async def calculate_wqi_batch_endpoint(input_data: BatchWQIInput):
    try:
        df = pd.DataFrame(input_data.data)
        if df.empty:
            return []

        df_with_wqi = calculate_wqi_for_df(df.copy())
        return df_with_wqi.to_dict(orient="records")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error while processing data: {str(e)}")

class PredictWQInput(BaseModel):
    BOD5: float
    COD: float
    TOC: float
    BHC: float
    Cd: float
    Cr6: float

@app.post("/predict_wq")
async def predict_wq(input_data: PredictWQInput):
    try:
        prediction = predict(input_data.dict())
        return {"predicted_WQ": round(prediction, 2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error while processing data : {str(e)}")
