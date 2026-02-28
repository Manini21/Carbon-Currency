# 🌍 Carbon Pricing Dashboard

> *"Someone turned the planet's breath into currency."*

A scroll-driven, data-first investigation into the global carbon credit market — built as an immersive web experience.

---

# 📌 Overview

Carbon pricing mechanisms such as Carbon Taxes and Emissions Trading Systems (ETS) are essential tools in addressing climate change. However, the raw datasets provided publicly contain:

Metadata rows

Unstructured text

Missing values

Empty columns

Non-standardized headers

This project focuses on building a complete data pipeline to clean, transform, and structure the dataset before using it for visualization.


# 🔄 Data Pipeline
1️⃣ Data Collection

Raw dataset downloaded in CSV format.

Dataset contained metadata, descriptive rows, and inconsistent formatting.

2️⃣ Data Cleaning (Python + Pandas)

The raw CSV file had:

Informational rows before actual headers

Empty columns

Missing values

Mixed formatting

Cleaning Steps Performed:

✔ Loaded CSV without default header
✔ Identified correct header row
✔ Removed metadata rows
✔ Dropped completely empty rows
✔ Dropped completely empty columns
✔ Standardized column names (lowercase, underscores)
✔ Replaced NaN values with None
✔ Exported structured JSON

3️⃣ Data Transformation

The cleaned dataset is exported in:

carbon_pricing_cleaned.json

Using:

df.to_json("carbon_pricing_cleaned.json", orient="records", indent=4)
Why JSON?

Easier frontend integration

Lightweight

Structured key-value format

Compatible with JavaScript fetch API

4️⃣ Data Visualization

The frontend consumes the cleaned JSON file and displays:

Carbon pricing instruments

Jurisdiction-level information

Policy coverage data

Structured tabular or graphical insights

# 🛠 Tech Stack
🔹 Data Processing

Python 3.11

Pandas

🔹 Frontend

HTML5

CSS3

JavaScript

⚙️ How to Run This Project
1️⃣ Clone the Repository
git clone <your-repo-link>
cd carbon-pricing-dashboard
2️⃣ Install Dependencies
pip install pandas
3️⃣ Run Data Cleaning Script

Navigate to:

cd data-processing
python clean_carbon_pricing.py

This generates:

carbon_pricing_cleaned.json
4️⃣ Launch Frontend

Open:

frontend/index.html

in your browser.

# 📊 Key Features

✅ Real-world dataset processing

✅ End-to-end data pipeline

✅ Structured JSON transformation

✅ Clean project architecture

✅ Frontend data integration

✅ Reproducible workflow

# 🎯 What Makes This Project Strong

This is not just a visualization project.

It includes:

Data engineering

Data cleaning

Structured transformation

Format conversion

Pipeline reproducibility

Frontend integration

It demonstrates practical skills in:

Data preprocessing

File handling

ETL workflow

Web-based visualization

# 🏆 CodeDex Monthly Challenge

This project was created as a submission for the CodeDex Monthly Challenge, showcasing practical data processing and structured frontend integration.

# 📚 Learning Outcomes

Through this project:

Understood how messy real-world datasets can be

Built a reproducible data pipeline

Converted unstructured CSV into structured JSON

Integrated processed data into frontend UI

# 📜 License

This project is for educational and analytical purposes.
