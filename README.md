# calculator
Calculator (Angular Frontend - Express Backend)

Kérlek, írd össze, hogy mit változtatnál a fentiekhez képest, ha egy skálázható, több szerveres környezetben kellene üzemeltetni a kódot, akár több ezer felhasználóval.
	
	- Felhasználó kezelést alkalmaznék, mindenki mentett memóriáját külön tárolnám egy NOSQL adatbázisban. Enélkül, a felhasználók az alkalmazás használatakor
	ugyanazt az egy adat fájlt, egymás mentését írnák felül.
	- Ennek másik megoldása lehetne az API-k elhagyása és kliens oldali, a felhasználó gépén való adattárolás vagy az,
	hogy az adatot kizárólag az alkalmazás/böngésző tárolná, de ez a böngésző bezárásakor az adatok elvesztését eredményezné.
	- Több szerver esetén igyekeznék a megfelelő load balancing stratégiával támogatni a szerverek terheltségét.
