[Symbiose 1.0 beta 2](http://symbiose.fr.cr/)
==============================================

This version (beta) is unstable.  
Cette version (beta) n'est pas stable.

Symbiose for Raspberrypi
------------------------

This is a modified version of Symbiose to enable GPIO managing directly from the Symbiose app _Framboise_. This is an old version of Symbiose, a newer version is available on the main repo (https://github.com/symbiose/symbiose/).

To manage GPIO through Symbiose, add this line to `/etc/sudoers` :
```
www-data ALL=NOPASSWD: path-to-symbiose/bin/gpio.php
```
(Of course, replace `path-to-symbiose` by the path to Symbiose)

Quick start
-----------

Clone the repo, `git clone git://github.com/symbiose/symbiose-raspberrypi.git`, or [download the latest release](https://github.com/symbiose/symbiose-raspberrypi/zipball/master).

Bug tracker
-----------

Have a bug ? Please create an issue here on GitHub : https://github.com/symbiose/symbiose/issues.

Installing
----------

To install Symbiose you just need to unzip files on your web server, and chmod all of them to 0777, except */.htaccess*, */etc/*, */home/*, */tmp/*, */usr/* and */var/* which you'll have to chmod to 0755.

Software requirements
---------------------

* Server : 
 * PHP >= 5.3
 * No database required
* Client : a fast and modern web browser (e.g. *Mozilla Firefox*)

Authors
-------

**$imon**
+ http://emersion.fr/
+ http://github.com/simonser

**Codel**
+ https://github.com/Codel

**Doppelganger**
+ https://github.com/Doppelganger-Symbiose

Copyright
---------

Contact: contact@symbiose.fr.nf  
Copyright (C) 2012 Simon Ser

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
    
    ******
    
    Ce programme est un logiciel libre : vous pouvez le redistribuer ou
    le modifier selon les termes de la GNU General Public Licence tels
    que publiés par la Free Software Foundation : à votre choix, soit la
    version 3 de la licence, soit une version ultérieure quelle qu'elle
    soit.

    Ce programme est distribué dans l'espoir qu'il sera utile, mais SANS
    AUCUNE GARANTIE ; sans même la garantie implicite de QUALITÉ
    MARCHANDE ou D'ADÉQUATION À UNE UTILISATION PARTICULIÈRE. Pour
    plus de détails, reportez-vous à la GNU General Public License.

    Vous devez avoir reçu une copie de la GNU General Public License
    avec ce programme. Si ce n'est pas le cas, consultez
    <http://www.gnu.org/licenses/>.
