import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Image from 'next/image'

export const metadata = {
  title: 'Our Story | Zalada',
  description: 'Learn about the culinary intent, regenerative farming, and chef-crafted approach behind Zalada\'s premium salad bowls in Trivandrum.',
}

export default function StoryPage() {
  return (
    <div className="relative isolate grain min-h-screen bg-[#EDEDEB]">
      <Navbar />
      
      <main className="relative z-10 pt-40 pb-32 px-4 md:px-8 mx-auto max-w-4xl">
        <div className="text-center mb-20">
          <p className="label-font text-[#AC624B]">Experience & Expertise</p>
          <h1 className="display-font mt-4 text-5xl md:text-7xl text-[#122018]">
            The Zalada Philosophy
          </h1>
          <p className="mt-8 text-lg text-[#3a5e48]/80 max-w-2xl mx-auto">
            We are not just a salad delivery service. We are a collective of culinary experts and local farmers dedicated to redefining fast food in Technopark, Trivandrum.
          </p>
        </div>

        <article className="prose prose-lg prose-green mx-auto text-[#3a5e48]">
          <h2 className="display-font text-3xl text-[#122018] mt-12 mb-6">Culinary Intent & Craft</h2>
          <p>
            At Zalada, every bowl is architected with intention. Our head chefs, bringing over 15 years of experience in fine dining and holistic nutrition, have designed a menu that prioritizes both cellular vitality and complex flavor profiles. 
          </p>
          <p>
            We don't use assembly lines. Each bowl is meticulously crafted, ensuring that the Lemon Mustard Vinaigrette perfectly coats the Amber Roast Chicken, and the crunch of the sweet potato is maintained from our kitchen to your desk.
          </p>

          <h2 className="display-font text-3xl text-[#122018] mt-12 mb-6">Regenerative Sourcing</h2>
          <p>
            Trust begins at the source. We partner directly with regenerative farms around the Trivandrum district. By eliminating the middleman, we ensure that our greens are harvested less than 24 hours before they reach your bowl. 
          </p>
          <div className="glass-card p-8 my-8 rounded-2xl border-[rgba(36,66,46,0.1)]">
            <h3 className="font-bold text-[#122018] mb-2">Our Quality Guarantee</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Zero preservatives or artificial flavor enhancers.</li>
              <li>Strict cold chain integrity from harvest to delivery.</li>
              <li>Compostable, botanical-based packaging to protect our environment.</li>
              <li>FSSAI certified and audited monthly for sanitary excellence.</li>
            </ul>
          </div>

          <h2 className="display-font text-3xl text-[#122018] mt-12 mb-6">Fueling Technopark</h2>
          <p>
            We understand the demands of the modern tech professional. High-pressure release cycles and back-to-back meetings require sustenance that prevents the afternoon crash. That's why our bowls are macronutrient-balanced, fiber-rich, and reliably delivered through Swiggy and Zomato directly to your campus.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  )
}
