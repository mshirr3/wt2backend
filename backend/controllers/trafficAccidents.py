import pandas as pd
import numpy as np

# separated by ";", encoding for å, ä, ö to not get errors
def load_deceased_data():
    df = pd.read_csv("static/deceased.csv", sep=';', encoding="iso-8859-1")
    return df

def load_injured_data():
    df = pd.read_csv("static/injured.csv", sep=';', encoding="iso-8859-1")
    return df

def prepare_data_for_bar(df):
    # first group by county, then sum quantity of injuries, (reset_index makes it back to dataframe)
    injuries_per_county = df.groupby('County')['Quantity'].sum().reset_index()

    # sort with county with most injuries first
    injuries_per_county = injuries_per_county.sort_values(by='Quantity', ascending=False)

    # the labels and data for chartjs (labels x-axis, data y-axis)
    labels = injuries_per_county['County'].tolist()
    data = injuries_per_county['Quantity'].tolist()

    return labels, data