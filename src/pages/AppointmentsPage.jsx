function AppointmentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
      <section className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-5">
          <p className="section-eyebrow">Appointments</p>
          <h1 className="section-title max-w-3xl">
            Private fittings and styling sessions for pieces that need
            precision.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-black/65">
            This page gives the site a believable service layer. Fashion stores
            often need more than products alone, especially when tailoring and
            fit are part of the brand.
          </p>
        </div>
        <div className="surface-panel">
          <p className="text-xs uppercase tracking-[0.3em] text-black/46">
            Studio availability
          </p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-black/68">
            <p>Tuesday to Sunday</p>
            <p>11:00 AM to 7:00 PM</p>
            <p>Appointments for styling, fitting, and alteration review</p>
          </div>
          <button type="button" className="button-primary mt-6">
            Request an appointment
          </button>
        </div>
      </section>
    </div>
  );
}

export default AppointmentsPage;
