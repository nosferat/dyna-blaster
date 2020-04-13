# Description

### Control:
- Arrows - move player
- Space - set bomb
- P - pause
- F - fullscreen
- Alt - remote bomb explosion

### Rounds:

1. [The Wall](#round-1)
2. Rocky Mountains
3. River
4. Forest
5. Lava Cave
6. Inside of the Castle, Part I
7. Inside of the Castle, Part II
8. Inside of the Castle, Final Stage

### Enemies:
- [Ballom](#ballom)
- [Ekutopu](#ekutopu)
- [Pomori](#pomori)
- [Boyon](#boyon)
- [Telpio](#telpio)
- [Pass](#pass)
- [Pontan](#pontan)
- [Arion](#arion)

### Bonuses:
- [Fire](#fire-up)
- [Bomb](#bomb-up)
- [Speed](#speed-up)
- [Remote Control](#remote)
- [Bomb Pass](#bomb-pass)
- [Life](#life)
- [Wall Pass](#wall-pass)

# Rounds:

### Round 1: The Wall <a id="round-1"></a>
- Stage 1:
  - Enemies:
    <img src="img/ballom.png" height="18" />
    <img src="img/ballom.png" height="18" />
    <img src="img/ballom.png" height="18" />
  - Bonus: fire

- Stage 2:
  - Enemies:
    <img src="img/ballom.png" height="18" />
    <img src="img/ballom.png" height="18" />
    <img src="img/ballom.png" height="18" />
    <img src="img/ekutopu.png" height="18" />
  - Bonus: bomb

- Stage 3:
  - Enemies:
    <img src="img/ballom.png" height="18" />
    <img src="img/ballom.png" height="18" />
    <img src="img/ekutopu.png" height="18" />
    <img src="img/ekutopu.png" height="18" />
  - Bonus: speed

- Stage 4:
  - Enemies:
    <img src="img/ballom.png" height="18" />
    <img src="img/ballom.png" height="18" />
    <img src="img/ekutopu.png" height="18" />
    <img src="img/ekutopu.png" height="18" />
    <img src="img/boyon.png" height="18" />
  - Bonus: remote control

- Stage 5:
  - Enemies:
    <img src="img/ballom.png" height="18" />
    <img src="img/ballom.png" height="18" />
    <img src="img/ekutopu.png" height="18" />
    <img src="img/ekutopu.png" height="18" />
    <img src="img/boyon.png" height="18" />
    <img src="img/boyon.png" height="18" />
  - Bonus: bomb pass

- Stage 6:
  - Enemies:
    <img src="img/ballom.png" height="18" />
    <img src="img/ballom.png" height="18" />
    <img src="img/ekutopu.png" height="18" />
    <img src="img/boyon.png" height="18" />
    <img src="img/pass.png" height="18" />
  - Bonus: life

- Stage 7:
  - Enemies:
    <img src="img/ballom.png" height="18" />
    <img src="img/ballom.png" height="18" />
    <img src="img/boyon.png" height="18" />
    <img src="img/boyon.png" height="18" />
    <img src="img/pomori.png" height="18" />
    <img src="img/pass.png" height="18" />
  - Bonus: wall pass

- Stage 8:
  - Enemies:
    <img src="img/arion-body.png" height="18" />
    <img src="img/telpio.png" height="18" />
    <img src="img/telpio.png" height="18" />
  - Bonus: no

# Enemies:

| Name    | Intellect | Wallpass | Bombpass | Speed | Score | Sprite                                    |
|---------|:---------:|:--------:|:--------:|:-----:|:-----:|:-----------------------------------------:|
| Ballom  | no        | no       | no       | low   | 100   | <img src="img/ballom.png" height="18" />  |
| Ekutopu | no        | no       | no       | low   | 400   | <img src="img/ekutopu.png" height="18" /> |
| Pomori  | no        | yes      | no       | low   | 800   | <img src="img/pomori.png" height="18" />  |
| Boyon   | no        | no       | no       | low   | 1000  | <img src="img/boyon.png" height="18" />   |
| Telpio  | no        | yes      | no       | low   | 2000  | <img src="img/telpio.png" height="18" />  |
| Pass    | yes       | no       | no       | high  | 4000  | <img src="img/pass.png" height="18" />    |
| Pontan  | yes       | yes      | no       | high  | 8000  | <img src="img/pontan.png" height="18" />  |
| Arion   | yes       | no       | yes      | low   | 20000 | <img src="img/arion.png" height="18" />   |

### Ballom: <a id="ballom"></a>
- Names: Valcom, Balloon.
- Behavior: in a collision with an obstacle changes his direction randomly.
- Sprite: <img src="img/ballom.png" height="18" />

### Ekutopu: <a id="ekutopu"></a>
- Behavior: sometimes changes his direction randomly.
- Sprite: <img src="img/ekutopu.png" height="18" />

### Pomori: <a id="pomori"></a>
- Names: Pat.
- Behavior: very often changes his direction randomly.
- Sprite: <img src="img/pomori.png" height="18" />

### Boyon: <a id="boyon"></a>
- Behavior: very often changes his direction randomly.
- Sprite: <img src="img/boyon.png" height="18" />

### Telpio: <a id="telpio"></a>
- Names: Terupyo.
- Behavior: very often changes his direction randomly.
- Sprite: <img src="img/telpio.png" height="18" />

### Pass: <a id="pass"></a>
- Names: Tiger.
- Behavior: pursues the hero from close range.
- Sprite: <img src="img/pass.png" height="18" />

### Pontan: <a id="pontan"></a>
- Names: Foton.
- Behavior: constantly pursues the hero.
- Sprite: <img src="img/pontan.png" height="18" />

### Arion: <a id="arion"></a>
- Behavior: almost always pursues the hero.
- Sprite: <img src="img/arion-body.png" height="18" />

# Bonuses:

### Fire: <a id="fire-up"></a>
- Effect: increases the maximum explosion radius by one.
- Max quantity: 10.
- Sprite: <img src="img/fire-up.png" height="18" />

### Bomb: <a id="bomb-up"></a>
- Effect: increases the number of simultaneous bombs by one.
- Max quantity: 5.
- Sprite: <img src="img/bomb-up.png" height="18" />

### Speed: <a id="speed-up"></a>
- Effect: increases the player's speed by one.
- Max quantity: 2
- Sprite: <img src="img/speed-up.png" height="18" />

### Remote Control: <a id="remote"></a>
- Effect: it allows the player to detonate bombs at any given time.
- Max quantity: 1.
- Sprite: <img src="img/remote.png" height="18" />

### Bomb Pass: <a id="bomb-pass"></a>
- Effect: it allows the player to walks through bombs.
- Max quantity: 1.
- Sprite: <img src="img/bomb-pass.png" height="18" />

### Life: <a id="life"></a>
- Effect: it gives the player an additional life.
- Max quantity: 10
- Sprite: <img src="img/life.png" height="18" />

### Wall Pass: <a id="wall-pass"></a>
- Effect: it allows the player to walk freely through soft blocks.
- Max quantity: 1
- Sprite: <img src="img/wall-pass.png" height="18" />