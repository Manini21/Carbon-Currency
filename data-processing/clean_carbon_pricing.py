import pandas as pd

df = pd.read_csv("../data/data_08_2025.csv", header=None)

# Set correct header row (row index 4)
df.columns = df.iloc[4]

# Remove metadata rows
df = df.iloc[5:].reset_index(drop=True)

# Drop completely empty rows and columns
df = df.dropna(how="all")
df = df.dropna(axis=1, how="all")

# Clean column names
df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")

# Make columns unique by appending suffixes
def make_unique(columns):
    counts = {}
    new_cols = []
    for col in columns:
        if col in counts:
            counts[col] += 1
            new_cols.append(f"{col}_{counts[col]}")
        else:
            counts[col] = 0
            new_cols.append(col)
    return new_cols

df.columns = make_unique(df.columns)

# Optional: replace NaN with None
df = df.where(pd.notnull(df), None)

# Convert to JSON
df.to_json("carbon_pricing_cleaned.json", orient="records", indent=4)

print("Cleaned JSON file created successfully!")
print("Rows:", len(df))
print("Columns:", list(df.columns))