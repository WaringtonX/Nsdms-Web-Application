import {
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TabStopPosition,
    TabStopType,
    TextRun
  } from "docx";
  const PHONE_NUMBER = "010 219 3000";
  const PROFILE_URL = "https://www.facebook.com/mersetasocial/";
  const EMAIL = "Stanley@merSETA.com";
  
  export class DocumentCreator {
    // tslint:disable-next-line: typedef
    public create([learnerDetails, nextofkinDetails, employerDetails,providerDetails, contractOfEmploymentDetails, WBLProgrammeSelection]): Document {
      const document = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: "WBL Agreement",
                heading: HeadingLevel.TITLE
              }),
              this.createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),
              this.createHeading("Learner Details"),
              ...learnerDetails
                .map(learnerDetails => {
                  const arr: Paragraph[] = [];
                  arr.push(
                    this.createInstitutionHeader(
                        'Personal Details',
                      `2022`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Learner Full Name: ${learnerDetails.learnerFullName}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Learner Date of Birth: ${learnerDetails.learnerDateofBirth}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Learner Gender: ${learnerDetails.learnerGender}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Learner Race: ${learnerDetails.learnerRace}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Learner Disability: ${learnerDetails.learnerDisability}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Learner Address: ${learnerDetails.learnerAddress}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Learner Contact Number: ${learnerDetails.learnerContactNumber}`
                    )
                  );
  
  
                  return arr;
                })
                .reduce((prev, curr) => prev.concat(curr), []),

              this.createHeading("Next Of Kin/Gaurdian Details"),
              ...nextofkinDetails
                .map(nextofkinDetails => {
                  const arr: Paragraph[] = [];
                  arr.push(
                    this.createInstitutionHeader(
                        'Next Of Kin Details',
                      `2022`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Next Of Kin Name: ${nextofkinDetails.nextofkinName}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Next Of Kin ID Number: ${nextofkinDetails.nextofkinIdentityNumber}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Next Of Kin Residential Address: ${nextofkinDetails.nextofkinResidentialAddress}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Next Of Kin Postal Address: ${nextofkinDetails.nextofkinPostalAddress}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Next Of Kin Email: ${nextofkinDetails.nextofkinEmail}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Next Of Kin Contact Number: ${nextofkinDetails.nextofkinContactNumber}`
                    )
                  );
  
  
                  return arr;
                })
                .reduce((prev, curr) => prev.concat(curr), []),

                this.createHeading("Employer Details"),
              ...employerDetails
                .map(employerDetails => {
                  const arr: Paragraph[] = [];
                  arr.push(
                    this.createInstitutionHeader(
                        'Employer Details',
                      `2022`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer Name: ${employerDetails.employerName}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer Trading Name: ${employerDetails.employerTradingName}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer Approval Number: ${employerDetails.employerApprovalNumber}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer Approving SETA: ${employerDetails.employerApprovingSETA}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer Approval Date: ${employerDetails.employerApprovalDate}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer Review Date: ${employerDetails.employerReviewDate}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer SDL Liability: ${employerDetails.employerSDLLiabilty}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer SDL Number: ${employerDetails.employerSDLNumber}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer Registered SETA: ${employerDetails.employerRegisteredSETA}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer SIC Code: ${employerDetails.employerSICCode}`
                    )
                  );arr.push(
                    this.createRoleText(
                      `Employer Acting Lead : ${employerDetails.employerActingLead}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer Business Address: ${employerDetails.employerBusinessAddress}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer Postal Address: ${employerDetails.employerPostalAddress}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer Contact: ${employerDetails.employerContact}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer Telephone Number: ${employerDetails.employerTelephoneNumber}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer Fax Number: ${employerDetails.employerFaxNumber}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer Cellphone Number: ${employerDetails.employerCellphoneNumber}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Employer Email: ${employerDetails.employerEmail}`
                    )
                  );
  
  
                  return arr;
                })
                .reduce((prev, curr) => prev.concat(curr), []),

                this.createHeading("Provider Details"),
              ...providerDetails
                .map(providerDetails => {
                  const arr: Paragraph[] = [];
                  arr.push(
                    this.createInstitutionHeader(
                        'Provider Details',
                      `2022`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Provider Name: ${providerDetails.providerName}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Provider Trading Name: ${providerDetails.providerTradingName}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Provider Accreditation Number: ${providerDetails.providerAccreditationNumber}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Provider Accreditation Council: ${providerDetails.providerAccreditationCouncil}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Provider Accreditation Review Date: ${providerDetails.providerAccreditationReviewDate}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Provider SDL Liability: ${providerDetails.providerSDLLiabilty}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Provider SDL Number: ${providerDetails.providerSDLNumber}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Provider SIC Code: ${providerDetails.providerSICCode}`
                    )
                  );arr.push(
                    this.createRoleText(
                      `Provider Acting Lead : ${providerDetails.providerActingLead}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Provider Business Address: ${providerDetails.providerBusinessAddress}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Provider Postal Address: ${providerDetails.providerPostalAddress}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Provider Contact: ${providerDetails.providerContact}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Provider Telephone Number: ${providerDetails.providerTelephoneNumber}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Provider Fax Number: ${providerDetails.providerFaxNumber}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Provider Cellphone Number: ${providerDetails.providerCellphoneNumber}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Provider Email: ${providerDetails.providerEmail}`
                    )
                  );
  
  
                  return arr;
                })
                .reduce((prev, curr) => prev.concat(curr), []),

                this.createHeading("Contract Of Employment Details"),
              ...contractOfEmploymentDetails
                .map(contractOfEmploymentDetails => {
                  const arr: Paragraph[] = [];
                  arr.push(
                    this.createInstitutionHeader(
                        'Contract Of Employment Details',
                      `2022`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Is this contract specific to the agreement period?: ${contractOfEmploymentDetails.contractSpecificToAgreementPeriod}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Was a copy created for the learner?: ${contractOfEmploymentDetails.contractCopyForLearner}`
                    )
                  );
  
  
                  return arr;
                })
                .reduce((prev, curr) => prev.concat(curr), []),

                this.createHeading("WBL Programme"),
              ...WBLProgrammeSelection
                .map(WBLProgrammeSelection => {
                  const arr: Paragraph[] = [];
                  arr.push(
                    this.createInstitutionHeader(
                        'WBL Programme Selection',
                      `2022`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `WBL Programme is: ${WBLProgrammeSelection.programSelection}`
                    )
                  );

  
  
                  return arr;
                })
                .reduce((prev, curr) => prev.concat(curr), []),

                /////////////////////////////////////

                
            //   this.createHeading("Employer Details"),
            //   ...experiences
            //     .map(position => {
            //       const arr: Paragraph[] = [];
  
            //       arr.push(
            //         this.createInstitutionHeader(
            //           position.company.name,
            //           this.createPositionDateText(
            //             position.startDate,
            //             position.endDate,
            //             position.isCurrent
            //           )
            //         )
            //       );
            //       arr.push(this.createRoleText(position.title));
  
            //       const bulletPoints = this.splitParagraphIntoBullets(
            //         position.summary
            //       );
  
            //       bulletPoints.forEach(bulletPoint => {
            //         arr.push(this.createBullet(bulletPoint));
            //       });
  
            //       return arr;
            //     })
            //     .reduce((prev, curr) => prev.concat(curr), []),

            //   this.createHeading("Provider Details"),
            //   this.createSubHeading("Skills"),
            //   this.createSkillList(skills),
            //   this.createSubHeading("Achievements"),
            //   ...this.createAchivementsList(achivements),
            //   this.createSubHeading("Interests"),
            //   this.createInterests(
            //     "Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing."
            //   ),

            //   this.createHeading("References"),
            //   new Paragraph(
            //     "Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk"
            //   ),
            //   new Paragraph("More references upon request"),
            //   new Paragraph({
            //     text:
            //       "This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio.",
            //     alignment: AlignmentType.CENTER
            //   }),

            //   this.createHeading("Learner Details For Real"),
            //   new Paragraph(
            //     "Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk"
            //   ),
            //   new Paragraph("More references upon request"),
            //   new Paragraph({
            //     text:
            //       "This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio.",
            //     alignment: AlignmentType.CENTER
            //   }),
            ]
          }
        ]
      });
  
      return document;
    }
  
    public createContactInfo(
      phoneNumber: string,
      profileUrl: string,
      email: string
    ): Paragraph {
      return new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun(
            `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
          ),
          new TextRun({
            text: "Address: 58 Elm Avenue, Kent ME4 6ER, UK",
            break: 1
          })
        ]
      });
    }
  
    public createHeading(text: string): Paragraph {
      return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_1,
        thematicBreak: true
      });
    }
  
    public createSubHeading(text: string): Paragraph {
      return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_2
      });
    }
  
    public createInstitutionHeader(
      institutionName: string,
      dateText: string
    ): Paragraph {
      return new Paragraph({
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX
          }
        ],
        children: [
          new TextRun({
            text: institutionName,
            bold: true
          }),
          new TextRun({
            text: `\t${dateText}`,
            bold: true
          })
        ]
      });
    }
  
    public createRoleText(roleText: string): Paragraph {
      return new Paragraph({
        children: [
          new TextRun({
            text: roleText,
            italics: true
          })
        ]
      });
    }
  
    public createBullet(text: string): Paragraph {
      return new Paragraph({
        text: text,
        bullet: {
          level: 0
        }
      });
    }
  
    // tslint:disable-next-line:no-any
    public createSkillList(skills: any[]): Paragraph {
      return new Paragraph({
        children: [new TextRun(skills.map(skill => skill.name).join(", ") + ".")]
      });
    }
  
    // tslint:disable-next-line:no-any
    public createAchivementsList(achivements: any[]): Paragraph[] {
      return achivements.map(
        achievement =>
          new Paragraph({
            text: achievement.name,
            bullet: {
              level: 0
            }
          })
      );
    }
  
    public createInterests(interests: string): Paragraph {
      return new Paragraph({
        children: [new TextRun(interests)]
      });
    }
  
    public splitParagraphIntoBullets(text: string): string[] {
      return text.split("\n\n");
    }
  
    // tslint:disable-next-line:no-any
    public createPositionDateText(
      startDate: any,
      endDate: any,
      isCurrent: boolean
    ): string {
      const startDateText =
        this.getMonthFromInt(startDate.month) + ". " + startDate.year;
      const endDateText = isCurrent
        ? "Present"
        : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;
  
      return `${startDateText} - ${endDateText}`;
    }
  
    public getMonthFromInt(value: number): string {
      switch (value) {
        case 1:
          return "Jan";
        case 2:
          return "Feb";
        case 3:
          return "Mar";
        case 4:
          return "Apr";
        case 5:
          return "May";
        case 6:
          return "Jun";
        case 7:
          return "Jul";
        case 8:
          return "Aug";
        case 9:
          return "Sept";
        case 10:
          return "Oct";
        case 11:
          return "Nov";
        case 12:
          return "Dec";
        default:
          return "N/A";
      }
    }
  }
  