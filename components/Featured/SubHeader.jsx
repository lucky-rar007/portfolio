import React from 'react'

const SERVICES = [
  {
    title: 'Full-Stack Web Development',
    body:
      'Building responsive, high-performance web applications using React.js, Tailwind CSS, Node.js, Express, and REST APIs.',
  },
  {
    title: 'AI & RAG Systems',
    body:
      'Designing Retrieval-Augmented Generation (RAG) applications using ChromaDB, Gemini, LLaMA 3, Ollama, and vector embeddings.',
  },
  {
    title: 'Backend Architecture',
    body:
      'Engineering scalable backend systems with Python, FastAPI, PostgreSQL, SQLite, and Microsoft Graph API integration.',
  },
  {
    title: 'Data & Event Pipelines',
    body:
      'Constructing event-driven signal processing, web scraping ingestion, and lineage tracking for complex business intelligence.',
  },
]

const SubHeader = () => {
  return (
    <div className='relative md:absolute md:top-1/5 left-0 md:left-12 lg:left-16 w-full md:w-[46%] md:mt-40 z-10 flex flex-col md:items-start items-center px-5 md:px-0'>
      <div className='w-full text-base md:text-2xl flex flex-col gap-3 md:gap-4 leading-relaxed md:leading-snug text-center md:text-left'>
        <p>
          Lakshraj Singh Chundawat is a Full-Stack &amp; AI Backend Developer specializing in Python, FastAPI, React, and Retrieval-Augmented Generation (RAG) systems.
        </p>
        <p>
          He constructs scalable web applications, intelligent data pipelines, and LLM-powered software solutions for complex organizational workflows.
        </p>
      </div>

      <div className='about-inline-services w-full mt-8 md:mt-12 h-auto md:h-[36vh]'>
        <div className='about-inline-services__head'>
          <span className='about-inline-services__label'>SERVICES &amp; EXPERTISE</span>
        </div>
        <div className='about-inline-services__grid'>
          {SERVICES.map((service) => (
            <article key={service.title} className='about-inline-services__item'>
              <h4>{service.title}</h4>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubHeader
