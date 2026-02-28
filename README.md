# 🌍 Carbon Pricing Dashboard

> *"Someone turned the planet's breath into currency."*

A data-first, scroll-driven web investigation into the global carbon pricing market. This project was built as a submission for the **CodeDex Monthly Challenge**.

---

## 📌 Overview
Public carbon pricing datasets are notoriously messy and rarely visualization-ready. They often contain:

* **Metadata rows** that break parsers
* **Unstructured text** mixed with numerical data
* **Missing values** and inconsistent null types
* **Empty columns** and non-standardized headers

This project builds a complete **data pipeline** to clean, transform, and structure the dataset before feeding it into a sleek frontend dashboard.

---

## 🔄 Data Pipeline

### 1️⃣ Data Collection
* Raw CSV dataset downloaded.
* Initial state: Contained metadata headers and inconsistent formatting that prevented direct browser-side rendering.

### 2️⃣ Two-Stage Data Cleaning (Python + Pandas)

**Stage 1 — Structural Cleaning**
* Removed metadata rows.
* Defined the correct header row for the dataframe.
* Dropped entirely empty rows and columns.

**Stage 2 — Standardization**
* Cleaned and "slugified" column names.
* Replaced `NaN` values with standardized nulls.
* Converted structured data to JSON for easy frontend consumption.

**Output:** `carbon_pricing_cleaned.json`

```python
# Exported using:
df.to_json("carbon_pricing_cleaned.json", orient="records", indent=4)

```

---

## 📊 Visualization

The cleaned JSON is consumed by the frontend to display:

* **Carbon pricing instruments** (Tax vs. ETS)
* **Jurisdiction-level data** for global comparisons
* **Policy coverage insights**
* **Structured tabular/graphical views** for deep-dive analysis

---

## 🛠 Tech Stack

| Layer | Tools |
| --- | --- |
| **Data Processing** | Python, Pandas |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |

---

## ⚙️ Run Locally

1. **Clone the repository**
```bash
git clone <your-repo-link>
cd carbon-pricing-dashboard

```


2. **Prepare the data**
```bash
pip install pandas
cd data-processing
python clean_carbon_pricing.py

```


3. **Launch the Dashboard**
Simply open the following file in your browser:
```text
frontend/index.html

```
---

## 🚀 Why This Project Matters

This isn't just a pretty chart—it demonstrates a full-stack data engineering workflow:

* **Real-world data cleaning:** Handling "dirty" public sector data.
* **ETL-style pipeline:** Extract, Transform, Load logic.
* **Structured transformation:** Converting legacy CSV formats to modern JSON.
* **Reproducible workflow:** Ensuring anyone can re-run the cleaning script.

---

## 🏆 CodeDex Monthly Challenge

Created as a **CodeDex Monthly Challenge** submission, showcasing practical data engineering integrated with frontend storytelling.

## 📜 License

For educational and analytical purposes.

```
