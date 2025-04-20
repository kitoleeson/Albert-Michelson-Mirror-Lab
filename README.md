# ⚡️ Albert Michelson Mirror Lab

This is an interactive simulation of Albert Michelson’s **rotating mirror experiment** (1879), one of the earliest successful attempts to measure the speed of light.

I built this simulation for my high school physics teacher, as a visual and engaging way to teach the principles behind the experiment. This simulation lets you fire a "light particle" and observe how its path is affected by a rotating mirror system.

## 📚 A Bit of History

Although Michelson’s experiment is the most well-known version, he wasn’t the first to measure the speed of light:

- **Hippolyte Fizeau** (1849) used a **toothed wheel** to interrupt light beams and measure how long they took to reflect back.
- **Léon Foucault** (1850) improved on this with a **rotating mirror**, proving light moves slower in water than in air.
- **Albert Michelson** (1879) refined the rotating mirror method to unprecedented precision, measuring over long distances and getting results remarkably close to the modern value. As recognition for this work, Michelson became the **first American to win the Nobel Prize in Physics** (1907).

This sim is based on **Michelson’s method**, showcasing the physics and geometry behind it.

## 🎮 How to Use

- 🎯 **Press `SPACE`** or click the **FIRE** button to launch a photon.
- 🛠 **Adjust the mirror setup** using the sliders:
  - 🔄 **Number of sides** on the rotating mirror
  - 🎛 **Angular velocity** of the rotating mirror
- 🧹 **Press `C`** to clear all particles from the screen.

## 🧠 What It Simulates

Michelson’s setup involved reflecting light off a rotating mirror toward a distant fixed mirror and back. If the rotating mirror spun at the perfect speed, the returning beam would reflect of the rotating mirror again at the correct angle to shine into an observer. If the mirror spun too fast or too slow, the light would deflect of its intended path, and never reach the observer. That angular offset helped calculate how long the light took to travel, and thus its speed using the classical uniform motion formula, V = d / t. This sim recreates that idea with a visual particle system and interactive controls.
> In Michelson's original experiment, he shot the light down an abandonded mine shaft between Mt. Wilson and Mt. San Antonio in California, USA. This distance was approximately 35km.

## 🧪 Future Improvements

Some features I’d like to build on in the future:
1. 🎵 Add sound effects for firing and hitting mirrors
2. 📏 Adjustable path length to simulate longer or shorter distances
3. 💥 Improve collision detection when a particle hits multiple mirrors simultaneously (currently may result in jittery or teleporting behavior)

## 🚀 Tech Stack

- 🎨 **p5.js** — for canvas rendering and interactive visual elements
- 💻 JavaScript — for simulation logic and DOM interaction
- 🌐 HTML + CSS — for layout and styling

## 🎓 Why I Made This

When my high school physics teacher taught our class about how Michelson managed to measure something as fast and intangible as light using just mirrors, gears, and patience, I was incredibly intrigued. Unusually, he didn't have a simlulation to help him teach this experiment like he usually did for relatively complicated experiments similar to it. In class, he mentioned he would like a simulation, but hadn't had the time to make one — so I made this for him. This project is my way of exploring the physics while also sharpening my creative coding skills, and paying forward to the new classes all the amazing ways my teacher inspired our class to love learning about the world around us.

## 📸 Preview

![image](https://github.com/user-attachments/assets/3f260c70-d85f-4605-bb99-db099d3dc492)

## 🌐 Live Site

I host this simulation on GitHub's free service at: https://kitoleeson.github.io/Albert-Michelson-Mirror-Lab/

## 📖 License

MIT — feel free to fork or get inspired, but please give credit where it’s due
