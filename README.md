This is a web application to search for chord progressions (from Bach chorales), which goes from one stationary chord to another. 

Progression fragments are made using music21 library by cutting out between fermata notes and written to a tab separated text file.
By scanning this database file, all fragments have been written to a .musicxml file with scamp & pymusicxml libraries. 
Displaying music notation on web page is made possible with verovio library.
Because of technical reasons some keys are encoded as if they are same as their enharmonically equivalent key: 
search for C# rather than Db or Ab rather than G#
