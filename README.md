<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<div align="center">
<h1 align="center">COS30049 - Assignment 2</h1>

  <p align="center">
    This assignment aims to guide students through the development of a complete machine learning project, focusing on real-world applications that involve both regression and classification tasks. The assignment challenges students to apply their technical skills to practical scenarios.
  </p>
</div>

<hr/>

<!-- ABOUT THE PROJECT -->

### About The Project

Climate change has a lot of risks, the unpredictable change of the climate in a region often causes delayed mitigation and significant losses as the residents of the impacted areas are unprepared towards the sudden changes that’s happening. One of the most unpredictable damage due to climate change is the increasing occurrence of bushfires. Using the past weather data set and bushfire data set that’s based in the United States, we develop a web application that could predict the weather and potential bushfire. This project uses machine learning techniques to ensure the accuracy of the prediction. This report talks about the process of collecting and transforming the relevant data, choosing the machine learning model, and implementing the predictive model.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built with using

- Python
- Pandas
- Numpy
- Scikit-Learn
- Seaborn
- Matplotlib

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation and Usage of the model

This is an example of how to list things you need to use the software and how to install them.

- create python virtual environment:
  ```
  Vscode settings and create virtual environment
  ```

- select kernel in machine-learning.ipynb:
   ```
   select .venv
   ```

- unzip datasets:
   ```
   upzip datasets.zip
   ```

- for the machine learning model, include the unzipped file path (most likely it's already done for you):
   ```
   data = pd.read_csv('INSERT DOWNLOAD DATASET PATH HERE', usecols=['state', 'discovery_month', 'discovery_doy', 't_min', 't_max', 'elevation', 'fire_size'])
   ```

- install necessery packages if they havent't been installed:
   ```
   pip install pandas matplotlib seaborn numpy scikit-learn
   ```

- provide input arguments to 'predict_risk' function
   ```
   date = '2026-07-15' 
   state = 'TX'
   t_min = 20
   t_max = 40

   risk_score = predict_risk(date, state, t_min, t_max)
   ```

<!-- WARNING -->
### WARNING
We have only provided datasets for visualisation and running the machine learning model only. Due the large size of the weather datasets and the time it takes to the clean and process them, we cannot include them in our project as it required large amount of storage space as well as sufficient computing power. It took our most powerful machine (M3 Pro Cip)
about 21 minutes to process the weather data. We have provided sources in our report. 


<!-- CONTACT -->

## Contact

- Anthony Tang - [@x](https://x.com/x) - john@doe.com
- Sayed Dileri - [@x](https://x.com/x) - john@doe.com
- Gloria Halim - [@x](https://x.com/x) - john@doe.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>
