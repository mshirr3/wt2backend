import pandas as pd
import numpy as np

# separated by ";", encoding for å, ä, ö to not get errors
def load_injured_data():
    df = pd.read_csv("static/injured.csv", sep=';', encoding="iso-8859-1")
    return df

def prepare_data_for_map(data, year):
    # filter data to get only for one specific year
    filtered = data[data['Year'] == int(year)]
    # group the data by injuries in each county
    injuries_per_county = filtered.groupby('County')['Quantity'].sum().reset_index()    
    # Convert to dict format for frontend
    result = injuries_per_county.to_dict(orient='records')
    return result