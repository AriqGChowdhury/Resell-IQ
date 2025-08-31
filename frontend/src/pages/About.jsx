
import '../styles/About.css'

function About() {
    return (
        <div className="about">
            <h1>About</h1>
            <p>Hi, thank you for visiting my application, it truly means a lot!</p>
            <p>I started this project out of a growing interest in buying and reselling items. I often browsed eBay, searching for products I could flip for a profit.</p>
            <p>During this process, I constantly found myself asking: "How much should I bid based on a laptop’s specs and condition?" and "What’s the right resale price?" These questions led to hours of manual research and wasted time.</p>
            <p>To solve this problem, and to challenge myself, I built a dataset from scratch and used PyTorch to train a model that does the heavy lifting for me. Now, this app helps automate those decisions and provides quick, data-driven resale and bidding prices.</p>
            
        </div>
    )
}

export default About;