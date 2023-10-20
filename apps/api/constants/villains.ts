import { Note } from '#interfaces/notes';

const Olga =
  "<p>Did you see that thing on her leg? If you didn't, I hope you're ready to hear about it until your " +
  'lunchbreaks over. You can try to dodge this predator of the polite, but your track record of lost lunch breaks ' +
  "speaks for itself.</p><p></p><p>This human meercat can sense when someone's eyeing their lunch and can hear a " +
  'growling stomach from two offices away. Your only hope is to sneak off when she goes to the bathroom.</p><p>' +
  '</p><p>If you can put up with the hunger.&nbsp;</p><p></p><blockquote><p>You heading out for lunch?' +
  '</p></blockquote><p></p><p>-Olga</p>';

const Gale =
  '<p><em>Four houses down from where you live</em>, Gale has never failed to take notice of when ' +
  "you've hosted a little gathering of friends.</p><p></p><p>Neither has he failed to take his missing invitation" +
  " personally. Gale talks about you more than you know, more meaning every chance he gets. Worse yet, by Gale's " +
  "account you're a secret murderer and Banksy style sidewalk chalker.</p><p></p><p>If you ever actually hear any " +
  "of the rumors Gale has been spreading about you, it's not entirely certain you'd be as upset as you'd likely " +
  "be confused.&nbsp;</p><p></p><blockquote><p>I'm telling you Margit, his other estranged son stopped by and said " +
  'the most awful things about his Thanksgiving turkey.</p></blockquote><p></p><p>-Gale</p>';

const Herold =
  "<p>Did you see that thing on her leg? If you didn't, I hope you're ready to hear about it until your lunchbreaks" +
  ' over. You can try to dodge this predator of the polite, but your track record of lost lunch breaks speaks for ' +
  "itself.</p><p></p><p>This human meercat can sense when someone's eyeing their lunch and can hear a growling " +
  'stomach from two offices away. Your only hope is to sneak off when she goes to the bathroom.</p><p></p><p>If you ' +
  'can put up with the hunger.&nbsp;</p><p></p><blockquote><p>You heading out for lunch?</p></blockquote><p></p><p>-' +
  'Olga</p>';

const Jeffery =
  "<p>Son of the Shush, Jeffery stares silently at guests who dare to sit in his mother's territory " +
  'while picking and eating his boogers.</p><p></p><p>Even if your attention span is the kind of steel trap that ' +
  "can lock your focus to a good book,&nbsp; you'll still not safe from Jeffery's antics.</p><p></p><p>After " +
  'four-to-five minutes, Jeffery will take give up on his silent assault and begin asking all manner of ' +
  "inappropriate questions about you. Should you seek out a parental unit for aid, you'll only find Joan " +
  '"<u>Shhhhhh</u>" Evergreen, who will berate you for talking to her unaccompanied child as with the less ' +
  'than subtle implications about your intentions in doing so.</p><p></p><blockquote><p>Why are your teeth ' +
  'so yellow?</p></blockquote><p>Jeffery</p>';

const Joan =
  '<p><span>Accomplish</span>&nbsp;to the Librarian, Joan "<u>Shhhhhh</u>" Evergreen stalks the ' +
  'chairs closest to the checkout counter. She sits at the ready, listening for the outrage of customers expressing ' +
  "shock at the bill they've amassed since the fourth grade.</p><p></p><blockquote><p>Shhhhhhhhhhhhhhhhhh" +
  '</p></blockquote><p>-Joan</p>';

const Gracie =
  "<p>There's absolutely nothing wrong with Gracie. She is by all accounts a sweet and considerate " +
  "person who is utterly disinterested in Gossip.</p><p></p><p>What she is doing with Gale is beyond anyone's " +
  "guess.&nbsp;</p><p></p><blockquote><p>Seriously, I don't know what she sees in him.</p></blockquote><p></p>" +
  "<p>-Martha, Gracie's mother-in-law</p>";

const Roscoe =
  '<p>You know that weird dog that shows up on your front door every now and then. No collar, no ' +
  'owner in sight, but somehow the nerve to bark at you for existing on your own property?</p><p></p><p>Well you' +
  " won't be surprised to know that weirdo Gale has raised himself one weird dog. Roscoe is locally famous for " +
  'his strange vocalizations that sound suspiciously like "no no no no no no no no no" whenever you get anywhere' +
  " near the strange poodle-spaniel hybrid.</p><p></p><p>It's said, Gale is always watching the twenty-six year" +
  ' old mutt from a distance, and will appear out of thin air if you even dream of scaring this bizarre intruder ' +
  'off of your property.</p>';

const Jane =
  "<p>Jane was never her name, it's just the stand-in title you've mentally stapled to her face. " +
  "You've forgotten her first name a little over a year ago and the window to politely admit you've forgotten " +
  "is maybe at most two weeks.</p><p></p><p>Grosman is probably her last name, but you've only heard Olga say it " +
  "and you're not really sure she's using vowels that exist in the English Alphabet when she says it.</p><p></p>" +
  "<p>It's gotten to the point that you've mastered a whole new method of speaking English, expertly avoiding " +
  'proper nouns, and expertly shirking suspicious with tactical use of pronouns and vague allusions.</p><p></p>' +
  '<blockquote><p>Hey, I saw what you wrote in my birthday card, your handwriting is crazy.</p></blockquote><p>' +
  '</p><p>-????</p>';

export const villains: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'status'>[] = [
  {
    title: 'Olga "Overshare" Sawyer',
    next: null,
    content: Olga,
  },
  {
    title: 'Gale "The Gossip" Anderson',
    next: 'Olga "Overshare" Sawyer',
    content: Gale,
  },
  {
    title: 'Herold "The Bookie" Hobstapher',
    next: 'Gale "The Gossip" Anderson',
    content: Herold,
  },
  {
    parentId: 'Herold "The Bookie" Hobstapher',
    title: 'Jeffery No-Peace',
    next: null,
    content: Jeffery,
  },
  {
    parentId: 'Herold "The Bookie" Hobstapher',
    title: 'Joan "Shhhhhh" Evergreen',
    next: 'Jeffery No-Peace',
    content: Joan,
  },
  {
    parentId: 'Gale "The Gossip" Anderson',
    title: 'Gracie Anderson',
    next: null,
    content: Gracie,
  },
  {
    parentId: 'Gale "The Gossip" Anderson',
    title: 'Roscoe "NONONONO" Wolferton',
    next: 'Gracie Anderson',
    content: Roscoe,
  },
  {
    parentId: 'Olga "Overshare" Sawyer',
    title: 'Jane "The Enigma" Grosman',
    next: null,
    content: Jane,
  },
];
