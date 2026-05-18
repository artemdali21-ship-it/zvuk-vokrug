import { workflow } from "@/data/workflow";

export function Workflow() {
  return (
    <section className="bg-paper2 py-20 md:py-28">
      <div className="container-page">
        <div className="mb-12 md:mb-16">
          <h2 className="display text-huge text-ink mb-3">
            Как мы работаем.
          </h2>
          <p className="text-ink2 text-lg">
            От запроса до демонтажа — без сюрпризов.
          </p>
        </div>

        <div className="space-y-0 divide-y divide-ink/10">
          {workflow.map((step) => (
            <div
              key={step.number}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-12 py-8 md:py-10 group"
            >
              <span className="display text-mega text-klein leading-none pt-1">
                {step.number}
              </span>
              <div>
                <h3 className="display text-xl md:text-2xl text-ink mb-2">
                  {step.title}
                </h3>
                <p className="text-ink2 leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
