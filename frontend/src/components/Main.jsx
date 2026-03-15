import React from 'react'

const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']
const subjects = [
  'health sports and safety',
  'applied Science',
  'FEE',
  'analog electronics',
  'environment studies',
  'engineering mathematics - I',
]

const Main = () => {
  return (
    <div className='min-h-screen w-full bg-[#c79047]'>
      <div className='mx-auto w-full border-[3px]border-[#1f1f1f] bg-[#c79047] text-[#fffdf8]'>
        <div className='px-4 py-5 text-center text-[clamp(20px,3vw,39px)] font-semibold leading-tight'>
          Download and practice previous year question papers for better exam preparation.
        </div>

        <div className='bg-[#efefef] px-4 py-2 text-center text-[clamp(18px,2.1vw,36px)] font-semibold text-[#1d1d1d]'>
          year 2025- 26 papers are updated
        </div>

        <div className='grid min-h-160 grid-cols-1 lg:grid-cols-[280px_1fr]'>
          <aside className='border-r-[3px] border-[#e9ddc9] px-4 pt-4 pb-6'>
            <div className='mb-8'>
              <h3 className='mb-3 text-[clamp(20px,1.5vw,28px)] font-semibold'>Select Your semester :</h3>
              <div className='grid grid-cols-4 gap-x-4 gap-y-3 text-[clamp(22px,1.25vw,27px)] font-medium'>
                {semesters.map((semester, index) => (
                  <button
                    key={semester}
                    type='button'
                    className={[
                      'text-left leading-none',
                      index === 0
                        ? 'w-fit rounded-sm bg-[#efefef] px-2 py-1 text-[#cb8f46]'
                        : 'bg-transparent px-0 py-0 text-[#f8f3ea]',
                    ].join(' ')}
                  >
                    {semester}
                  </button>
                ))}
              </div>
            </div>

            <div className='mb-10'>
              <h3 className='mb-3 text-[clamp(20px,1.5vw,28px)] font-semibold'>Select Examination:</h3>
              <div className='flex items-center gap-6 text-[clamp(22px,1.25vw,29px)] font-medium'>
                <button
                  type='button'
                  className='w-fit rounded-sm bg-[#efefef] px-2 py-1 leading-none text-[#cb8f46]'
                >
                  Midsem
                </button>
                <button type='button' className='leading-none text-[#f8f3ea]'>
                  Endsem
                </button>
              </div>
            </div>

            <div>
              <h3 className='mb-3 text-[clamp(20px,1.5vw,28px)] font-semibold'>Select Subject:</h3>
              <div className='space-y-2'>
                {subjects.map((subject) => (
                  <label key={subject} className='flex items-center gap-3 text-[clamp(16px,1vw,22px)]'>
                    <input
                      type='checkbox'
                      className='h-[16px] w-[16px] accent-[#f3ead7]'
                      aria-label={subject}
                    />
                    <span className='leading-tight'>{subject}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <section className='px-4 pt-2 pb-8 sm:px-6'>
            <h2 className='mb-4 text-[clamp(36px,2.4vw,49px)] font-semibold tracking-wide'>HERE ARE YOUR PAPERS :</h2>

            <div className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16'>
              {[1, 2, 3, 4, 5, 6].map((card) => (
                <div
                  key={card}
                  className='mx-auto w-[170px] rounded-[20px] border-[4px] border-[#f2ece2] bg-[#fcfbf9] p-2 shadow-[0_2px_0_rgba(255,255,255,0.35)] sm:w-[180px]'
                >
                  
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Main
