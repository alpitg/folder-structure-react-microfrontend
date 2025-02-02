export class CompanyDetailsModel {
  constructor(
    public id: number,
    public name: string,
    public website: string,
    public logo: string,
    public startedInYear: string,
    public description: string,
    public about: string,
    public ourMission: OurApproachModel,
    public ourVision: OurApproachModel,
    public ourValue: OurApproachModel,

    public services: ServicesModel[],
    public projects: string,
    public testimonials: string,
    public team: string,
    public awards: string,
    public partners: string,
    public whyChooseUs: WhyChooseUsModel[],
    public projectSteps: ProjectStepsModel[],
    public faqs: FaqsModel[],
    public workWith: WorkWithModel[],

    public contact: ContactModel,
    public numberOfEmployees: string,
    public numberOfProjectsCompleted: string,
    public clientSatisfaction: string,
    public revenue: string,
    public certifications: string[]
  ) {}
}

export class ContactModel {
  constructor(
    public id: number,
    public name: string,
    public title: string,
    public phone: string,
    public email: string,

    public address: string,
    public city: string,
    public state: string,
    public zip: string,

    public hours: string,
    public map: string,
    public social: SocialMedia[]
  ) {}
}

export class SocialMedia {
  constructor(
    public id: number,
    public name: string,
    public url: string,
    public icon: string
  ) {}
}

export class ServicesModel {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public icon: string
  ) {}
}

export class WhyChooseUsModel {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public src: string
  ) {}
}

export class OurApproachModel {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public values: string[]
  ) {}
}

export class ProjectStepsModel {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public src: string
  ) {}
}

export class FaqsModel {
  constructor(
    public id: number,
    public question: string,
    public answer: string
  ) {}
}

export class WorkWithModel {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public src: string
  ) {}
}
