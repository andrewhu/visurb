# Visualizing the Urban Dictionary
Using BERT sentence embeddings and t-SNE to visualize terms from the Urban Dictionary.

## Dependencies
* [sentence-transformers](https://github.com/UKPLab/sentence-transformers) to create sentence embeddings
* [scikit-learn](https://github.com/scikit-learn/scikit-learn) to transform our sentence embeddings into 2D

## Getting the data
*Note: The original plan was to visualize the top 100 most voted words, but after seeing what those words were, I decided that it was a little too R-rated for me.*

Data for names and star signs are included in this repository. Data for names comes from the SSA's [Popular Baby Names](https://www.ssa.gov/oact/babynames/) dataset ([zip file here](https://www.ssa.gov/oact/babynames/names.zip)).

If you want to define your own terms, the Urban Dictionary has a public API endpoint where you can define terms. For example, to define "boomer", `http://api.urbandictionary.com/v0/define?term=boomer` will return a list of definitions in JSON format.

If you want a complete-ish dataset of terms and definitions, there's [this one on Kaggle](https://www.kaggle.com/therohk/urban-dictionary-words-dataset). A quick Google search may yield more recent results.

Note that the quality of definitions can vary greatly, and it is recommended to manually inspect/choose the definitions for best results.

Future work: Top artists https://www.billboard.com/charts/greatest-of-all-time-artists

## Creating the visualizations
Code for generating visualizations is in `create_embeddings.ipynb`. The code is really simple!

