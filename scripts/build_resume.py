#!/usr/bin/env python3
"""Build Benjamin Stanley Frohman research resume PDF."""
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Table, TableStyle,
)

OUT = Path(__file__).resolve().parents[1] / "assets" / "Benjamin_Frohman_Research_Resume.pdf"
NAVY = colors.HexColor("#1B365D")
INK = colors.HexColor("#1a1a1a")
MUTED = colors.HexColor("#444444")
RULE = colors.HexColor("#1B365D")


def styles():
    s = getSampleStyleSheet()
    s.add(ParagraphStyle(name="Name", fontName="Times-Bold", fontSize=18, leading=20, alignment=TA_CENTER, textColor=NAVY, spaceAfter=3))
    s.add(ParagraphStyle(name="Line", fontName="Times-Italic", fontSize=9.5, leading=12, alignment=TA_CENTER, textColor=MUTED, spaceAfter=2))
    s.add(ParagraphStyle(name="Links", fontName="Times-Roman", fontSize=8.5, leading=11, alignment=TA_CENTER, textColor=INK, spaceAfter=6))
    s.add(ParagraphStyle(name="H", fontName="Times-Bold", fontSize=11, leading=13, textColor=NAVY, spaceBefore=10, spaceAfter=4))
    s.add(ParagraphStyle(name="Job", fontName="Times-Bold", fontSize=10.5, leading=13, textColor=NAVY, spaceBefore=6, spaceAfter=0))
    s.add(ParagraphStyle(name="Meta", fontName="Times-Italic", fontSize=9, leading=11, textColor=MUTED, spaceAfter=3))
    s.add(ParagraphStyle(name="Body", fontName="Times-Roman", fontSize=9.4, leading=12.2, alignment=TA_JUSTIFY, textColor=INK, spaceAfter=4))
    s.add(ParagraphStyle(name="Item", fontName="Times-Roman", fontSize=9.4, leading=12.2, textColor=INK, leftIndent=12, bulletIndent=0, spaceAfter=1.5))
    s.add(ParagraphStyle(name="Cell", fontName="Times-Roman", fontSize=8.3, leading=11, textColor=INK))
    s.add(ParagraphStyle(name="CellH", fontName="Times-Bold", fontSize=8, leading=10, textColor=NAVY))
    s.add(ParagraphStyle(name="Foot", fontName="Times-Italic", fontSize=8, leading=10, alignment=TA_CENTER, textColor=MUTED, spaceBefore=8))
    return s


def bullet(text, st):
    return Paragraph("•  " + text, st["Item"])


def build():
    st = styles()
    story = []
    story.append(Paragraph("BENJAMIN FROHMAN", st["Name"]))
    story.append(Paragraph("Lewisville / Frisco, Texas · Remote-ready · Founder, A2Zweb 3", st["Line"]))
    story.append(Paragraph(
        "Research systems · Geometric methods · Formal verification · Frontier consulting",
        st["Line"],
    ))
    story.append(Paragraph(
        '<link href="mailto:frohmanbenjamin@gmail.com">frohmanbenjamin@gmail.com</link>'
        '  ·  <link href="https://github.com/BenFrohman">github.com/BenFrohman</link>'
        '  ·  <link href="https://x.com/Investor0x">x.com/Investor0x</link><br/>'
        '<link href="https://orcid.org/0009-0006-7068-3718">orcid.org/0009-0006-7068-3718</link>'
        '  ·  <link href="https://www.linkedin.com/in/benfrohman-inv0x">LinkedIn</link>'
        '  ·  <link href="https://zenodo.org/search?q=Frohman%20Anagram%20Reachability">Zenodo</link>'
        '  ·  <link href="https://fsymhd-production.up.railway.app">FSymHD observatory</link>',
        st["Links"],
    ))
    story.append(HRFlowable(width="100%", thickness=1.1, color=RULE, spaceAfter=6))

    story.append(Paragraph("SUMMARY", st["H"]))
    story.append(HRFlowable(width="100%", thickness=0.4, color=RULE, spaceAfter=6))
    story.append(Paragraph(
        "Independent researcher and founder of A2Zweb 3 (est. 2 February 2022), delivering consulting and research "
        "in AI, digital assets, and infrastructure with a focus on mathematical application at frontier pace. "
        "Designs complete, engineerable systems: geometric analysis, Lean 4 formalization that compiles to "
        "hand-legible proofs, and operational artifacts that downstream teams can execute without keeping the "
        "author in the critical path. Available for remote research-staff, advisor, and project-lead roles.",
        st["Body"],
    ))

    story.append(Paragraph("PROFESSIONAL EXPERIENCE &amp; OWNERSHIP", st["H"]))
    story.append(HRFlowable(width="100%", thickness=0.4, color=RULE, spaceAfter=4))

    story.append(Paragraph("Founder — A2Zweb 3", st["Job"]))
    story.append(Paragraph("Consulting and research studio · 2 February 2022 – Present", st["Meta"]))
    story.append(bullet("Own the studio’s research and consulting practice: AI systems, digital-asset infrastructure, and novel mathematical methods applied under real resource and time constraints.", st))
    story.append(bullet("Produce stakeholder-ready instruments — schemas, phased roadmaps, acceptance criteria, risk registers — that engineering and research teams can execute independently.", st))
    story.append(bullet("Hold high accountability for both conceptual depth and operational constraints (compute overhead, multi-tenancy, phased adoption, security posture).", st))

    story.append(Paragraph("Independent Research Lead", st["Job"]))
    story.append(Paragraph("Self-directed geometric and formal program · 2024 – Present", st["Meta"]))
    story.append(bullet("Frohmanian Symplectohydrodynamics (FSymHD): symplectic tether, metriplectic control, and holographic duals for 3D Navier–Stokes regularity and fusion-plasma architecture.", st))
    story.append(bullet("Lean 4 formalization and proof-verification pipelines: machine-checked arguments compiled into explicit and high-level handwritten proofs; work on frontier open problems in geometric analysis.", st))
    story.append(bullet("Research on preserving Boolean / discrete logical structure inside numerical integrators and continuous functionals, with application to plasma MHD and FSymHD tethered dynamics.", st))
    story.append(bullet("HLEX Coordination Fabric — five-layer geometry-aware multi-model infrastructure (proposal available on request).", st))

    story.append(Paragraph("Progressive Insurance", st["Job"]))
    story.append(Paragraph("Technical and operational roles · Ongoing", st["Meta"]))
    story.append(bullet("Sustained professional delivery and accountability in parallel with independent research and the A2Zweb 3 practice.", st))

    story.append(Paragraph("SELECTED SYSTEMS (DISCREET / PRODUCT)", st["H"]))
    story.append(HRFlowable(width="100%", thickness=0.4, color=RULE, spaceAfter=4))
    story.append(Paragraph("SealGuard", st["Job"]))
    story.append(Paragraph("Integrity architecture · in development", st["Meta"]))
    story.append(bullet("Containment and integrity layer for agentic and infrastructure surfaces. Threat model, scope, and internals available under NDA — not disclosed here.", st))
    story.append(Paragraph("Overemployed-Job Bot", st["Job"]))
    story.append(Paragraph("Private multi-tenant SaaS · AI job-hunting pipelines · 2026", st["Meta"]))
    story.append(bullet("Designed and built a private commercial SaaS: tenant-scoped data, AI scanning/application pipelines, 24-hour trial, lifetime unlock. Source remains private; product, not an open giveaway.", st))
    story.append(Paragraph("Modular robotic excitation arms", st["Job"]))
    story.append(Paragraph("Mechanical design studies drafted with Grok", st["Meta"]))
    story.append(bullet("Modular rotating ball-joint arms driving rolling excitation disks — a kinematic architecture for distributed mechanical excitation. Design studies; hardware roadmap on request.", st))

    story.append(KeepTogether([
        Paragraph("EDUCATION", st["H"]),
        HRFlowable(width="100%", thickness=0.4, color=RULE, spaceAfter=4),
        Paragraph("University of Texas at Dallas", st["Job"]),
        Paragraph("Undergraduate study completed 2022 · three years, 2018–2022 · business, economics, and finance", st["Meta"]),
        Paragraph("St. Edward’s University — Austin, Texas", st["Job"]),
        Paragraph("One year of concurrent undergraduate study during the UT Dallas period", st["Meta"]),
        Paragraph(
            "Prior focus in pre-medical study. Student-Research Intern, UT Southwestern Medical Center (Dallas), 2012–2013: "
            "hands-on clinical research in neuro-ophthalmology, conducting patient testing for ocular/motor studies in multiple sclerosis "
            "under a world-class clinician-scientist team. That work produced two peer-reviewed publications (table below).",
            st["Body"],
        ),
    ]))

    story.append(Paragraph("PRIOR PEER-REVIEWED PUBLICATIONS (NEURO-OPHTHALMOLOGY)", st["H"]))
    story.append(HRFlowable(width="100%", thickness=0.4, color=RULE, spaceAfter=4))
    story.append(Paragraph(
        "Not FSymHD. Listed as provenance of prior clinical research resolve. Full links also live on the observatory prior-research tab.",
        st["Meta"],
    ))

    cell, head = st["Cell"], st["CellH"]
    rows = [
        [Paragraph("Year", head), Paragraph("Venue", head), Paragraph("Work", head)],
        [
            Paragraph("2017", cell),
            Paragraph("JAMA Neurology 74(5):574–582", cell),
            Paragraph(
                'Meltzer et al., including <b>Benjamin S. Frohman</b>. '
                '<i>Retinal architecture and melanopsin-mediated pupillary response characteristics: a putative pathophysiologic signature for the retino-hypothalamic tract in multiple sclerosis.</i> '
                'DOI: <link href="https://doi.org/10.1001/jamaneurol.2016.5131">10.1001/jamaneurol.2016.5131</link>',
                cell,
            ),
        ],
        [
            Paragraph("2018", cell),
            Paragraph("J. Neurol. Sci. 387:60–69", cell),
            Paragraph(
                'Sobhanian et al. '
                '<i>Identification and treatment of the visual processing asymmetry in MS patients with optic neuritis: The Pulfrich phenomenon.</i> '
                'DOI: <link href="https://doi.org/10.1016/j.jns.2018.01.029">10.1016/j.jns.2018.01.029</link>'
                ' · PMID: <link href="https://pubmed.ncbi.nlm.nih.gov/29571874/">29571874</link>',
                cell,
            ),
        ],
    ]
    table = Table(rows, colWidths=[0.7 * inch, 1.7 * inch, 4.6 * inch], repeatRows=1)
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E8EEF5")),
        ("GRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#C5CDD8")),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(table)
    story.append(Paragraph(
        'ORCID record (featured works): <link href="https://orcid.org/0009-0006-7068-3718">https://orcid.org/0009-0006-7068-3718</link>',
        st["Body"],
    ))
    story.append(Paragraph(
        "Full technical proposals (HLEX v1.1, FSymHD instruments, SealGuard NDA brief) available on request.",
        st["Foot"],
    ))

    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=letter,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        topMargin=0.55 * inch,
        bottomMargin=0.5 * inch,
        title="Benjamin Stanley Frohman — Research Resume",
        author="Benjamin Stanley Frohman",
    )
    doc.build(story)
    print("wrote", OUT, "bytes", OUT.stat().st_size)


if __name__ == "__main__":
    build()
