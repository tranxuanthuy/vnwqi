import pandas as pd
from prophet import Prophet
from scipy.special import logit, expit

def forecast_wqi_monthly(series: pd.Series, steps: list = [1, 3, 6, 12]) -> dict:
    """
    Dự báo WQI theo tháng với logit transform để giữ giá trị trong khoảng (0, 100).
    Input:
        series: pd.Series (index = datetime, value = WQI 0–100)
        steps: list of forecast horizons (in months)
    Output:
        dict: các bước dự báo, giá trị WQI (float, clipped trong [0,100])
    """
    # Chuẩn hóa về [0.01, 0.99] và logit transform
    scaled = (series / 100).clip(0.01, 0.99)
    df = pd.DataFrame({'ds': scaled.index, 'y': logit(scaled)})

    model = Prophet()
    model.fit(df)

    max_step = max(steps)
    future = model.make_future_dataframe(periods=max_step, freq='MS')
    forecast = model.predict(future)

    result = {}
    for step in steps:
        target_date = df['ds'].max() + pd.DateOffset(months=step)
        row = forecast[forecast['ds'] == target_date]
        if not row.empty:
            yhat_logit = row['yhat'].values[0]
            yhat_prob = expit(yhat_logit)  # chuyển về [0,1]
            wqi = round(yhat_prob * 100, 2)
            result[f'{step}_month'] = wqi
        else:
            result[f'{step}_month'] = None

    return result
