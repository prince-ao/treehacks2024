import tagCleaner


def explore_med(med_soup):

    def scrape_intersection(start_tag, end_tag, start_id, end_id):
        try:
            start_ = med_soup.find(start_tag, attrs={"id": start_id}).find_all_next("p")
            stop_ = med_soup.find(end_tag, attrs={"id": end_id}).find_all_previous("p")
            temp = [str(i) for i in start_ if i in stop_]
            clean = tagCleaner.cleanhtml(temp)

            return clean
        except AttributeError:
            return 'None'

    uses = scrape_intersection("h2","h2","uses","warnings")
    warnings = scrape_intersection("h2","h2","warnings","before-taking")
    before_taking = scrape_intersection("h2","h2","before-taking","dosage")
    dosage = scrape_intersection("h2","h2","dosage","what-to-avoid")
    what_to_avoid = scrape_intersection("h2","h2","what-to-avoid","side-effects")
    side_effects = scrape_intersection("h2","h2","side-effects","interactions")

    try:
        related = med_soup.find("div",attrs={"id":"related-drugs"}).text
        relate = related[22:-1]
    except AttributeError:
        related = 'None'


    try:
        faq = med_soup.find("div",attrs={"class":"ddc-accordion ddc-mgb-2"}).text
        faq_ = faq.replace("Continue reading","")
    except AttributeError:
        faq_ = 'None'


    try:
        subtitle = med_soup.find("p",attrs={"class":"drug-subtitle"}).text
        
    except AttributeError:
        subtitle = 'None'


    try:
        reviewed_by = med_soup.find("p",attrs={"class":"ddc-reviewed-by ddc-author-image"}).find_next("span").text

    except AttributeError:
        reviewed_by = "None"


    # print("Subtitle =>",subtitle,end="\n\n")
    # print("Reviewed By => ",reviewed_by,end="\n\n")
    # print("Uses => ",uses,end="\n\n")
    # print("Warnings => ",warnings,end="\n\n")
    # print("Before Dosage => ",before_taking,end="\n\n")
    # print("Dosage => ",dosage,end="\n\n")
    # print("What to avoid => ",what_to_avoid,end="\n\n")
    # print("Side Effects => ",side_effects,end="\n\n")
    # print("FAQ =>",faq_)
    # print("Related Drugs => ",related)

    
    res_data = {"Subtitle":subtitle, "Reviewed By":reviewed_by, "Uses":uses, "Warnings":warnings,"Before Dosage" : before_taking, 
            "Dosage":dosage, "What to avoid": what_to_avoid, "Side Effects": side_effects}

    return res_data

    # if(subtitle == "None" and reviewed_by == "None" and uses == "None" and warnings == "None" and before_taking == "None" and dosage == "None" and side_effects == "None"):
    #     whole = med_soup.find_all("p")
    #     print(whole)