"""
Data Cleaning Script
Source: OWID CO2 Dataset
Purpose:
- Extract latest year (2024)
- Compute percent change since 2005
"""

import pandas as pd

df = pd.read_csv("owid-co2-data.csv")

countries = [
    "Germany",
    "France",
    "United Kingdom",
    "United States",
    "China",
    "India"
]

df = df[df["country"].isin(countries)]
df = df[["country", "year", "co2", "co2_per_capita"]]
df = df.dropna()
df = df[df["year"] >= 1995]

max_year = df["year"].max()

# Compute % change since 2005
results = []

for country in countries:
    country_df = df[df["country"] == country]
    base = country_df[country_df["year"] == 2005]["co2"].values
    latest = country_df[country_df["year"] == max_year]["co2"].values
    
    if len(base) > 0 and len(latest) > 0:
        pct_change = ((latest[0] - base[0]) / base[0]) * 100
        results.append({
            "country": country,
            "percent_change_since_2005": round(pct_change, 2)
        })

print("Percent change since 2005:")
print(results)

df.to_json("cleaned_co2.json", orient="records")