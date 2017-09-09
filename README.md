### Vaultoro Test Submission

#### Running the project

1)[Install Meteor](https://www.meteor.com/install) (if you haven't already)

2) Clone the repo

```
git clone https://github.com/liamtlr/vaultoro-test.git
```
3) Install dependencies
```
npm install
```
4) Run the project
```
npm start
```

#### Relevant design decisions

1) I approached this as if the individual tasks were tickets on a Trello/Waffle/Kanban board (e.g. small / medium sized tickets that should be implemented pretty quickly).
2) This was my first time using React - I didn't want to take the *easier* Blaze option. As a result my implementation of React components may not be ideal - but hopefully it demonstrates I can figure out a new framework pretty quickly.
3) For task 10 - I did indeed duplicate the majority of code from the documents/gifs page for the videos page, instead of **reusing** the same code where possible (e.g. attach the same scheme to the Mongo collection). This was because whilst duplication creates ... duplication, it does not create interdependency between videos and gifs - so if gifs page needs to have comments in the future - it can without impacting videos.
4) I didn't attempt task 10 - as I would have had to use a library - which always makes me nervous depending on OS libraries for security. I'm pretty familiar with rudimentary hashing.

Please let me know if you have any further questions as to my implementation of the tasks.

### Pup
A boilerplate for products.

[Read the Documentation](http://cleverbeagle.com/pup)

---

Need help and want to stay accountable building your product? [Check out Clever Beagle](http://cleverbeagle.com).
