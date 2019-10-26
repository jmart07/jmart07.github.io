# Gnome Warlock
Find it here: https://jmart07.github.io/gnome-warlock/

## Description
Gnome Warlock is a point-and-click strategy game where you guide a gnome against the forces of evil. Get the highest score you can by killing enemies and progressing through the levels.

## Technology Used
### Used to run the game itself:
HTML, CSS, Javascript, and the Jquery version 3.4.1-- "https://code.jquery.com/jquery-3.4.1.js"
### Used to create the game:
VS Code, Chrome, Aesprite

## Approach Taken
This game was inspired by turn-based grid games like Triple Town and others. I knew to start it would be one player, turn-based, (player then computer), and only survival rather than having a specific win condition. I figured the gameboard would be a CSS grid, and that it would be produced and given coordinates by nested for loops. I also knew the player characters would be objects and the play would be driven by click events.

After a small amount of pseudocoding, I started working out how the board would be produced. The first milestone was getting a square board with a player character that could be moved around with clicks.

From this point I had to add properties to the player character, so I developed a class for game characters and worked off of that. Once I got to creating enemies, I realized class extensions would be the best approach to differentiate methods used by the player and AI, (such as move()).

The final hurdles were figuring out how to get the enemies to move toward the player and getting the game to flow normally. A great deal of time was spent fixing bugs in the positioning of opjects.

## What's next?
I plan on refactoring everything, adding a ton of functionality, adding animations, and styling extensively.
### Functionality to be added:
Power-ups, ranged attacks, different enemy types, walls and other non-character obstacles, boss battles, and more!
### Animations and Styling to be added:
Animations on attacking, moving, and deaths of characters. Mouseover events and indicators on the move/attack options available to the player. Better graphics and a more unified theme.



