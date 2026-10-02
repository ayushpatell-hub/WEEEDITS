import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/ui/ContactForm";

const info = [
  { id: 1, emoji: "📧", label: "Email", value: "hello@weeedits.com" },
  { id: 2, emoji: "📱", label: "Phone", value: "+91 00000 00000" },
  { id: 3, emoji: "📍", label: "Location", value: "India" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Let's Work Together"
        description="Tell us about your project and we will get back to you."
      />

      <section className="py-20">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="space-y-4">
              {info.map((i) => (
                <div key={i.id} className="card flex items-center gap-4">
                  <div className="text-3xl">{i.emoji}</div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted">
                      {i.label}
                    </p>
                    <p className="font-display font-semibold">{i.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}