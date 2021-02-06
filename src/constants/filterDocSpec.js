import { Util } from "react-xml-editor";
import request from "../utils/request";

const filterDocSpec = {
    elements: {
        RequestId: {
            
            hasText: true,
            asker: Util.askLongString,
        }
    }
}

export default filterDocSpec;

export const decisionXML = (
    id,
    subName,
    subLastName,
    subCity,
    subStreet,
    subType,
    appealDate,
    reqDate,
    recCity,
    recStreet
) => `<?xml version="1.0" encoding="UTF-8"?>
<sh:DecisionAppealFilter xmlns:sh="http://www.shared.com" >
<RequestId>${id}</RequestId>
<SubmitterName>${subName}</SubmitterName>
<SubmitterLastname>${subLastName}</SubmitterLastname>
<SubmitterCity>${subCity}</SubmitterCity>
<SubmitterStreet>${subStreet}</SubmitterStreet>
<SubmitterType>${subType}</SubmitterType>
<RequestDate>${reqDate?.toLocaleDateString("en-CA") || ''}</RequestDate>
<AppealDate>${appealDate?.toLocaleDateString("en-CA") || ''}</AppealDate>
<RecipientCity>${recCity}</RecipientCity>
<RecipientStreet>${recStreet}</RecipientStreet>
</sh:DecisionAppealFilter>`

export const silenceXML = (
    id,
    subName,
    subLastName,
    subCity,
    subStreet,
    subType,
    appealDate,
    reqDate,
    recCity,
    recStreet,
    requestDetails,
    authorityName
) => `<?xml version="1.0" encoding="UTF-8"?>
<sh:SilenceAppealFilter xmlns:sh="http://www.shared.com" >
<RequestId>${id}</RequestId>
<SubmitterName>${subName}</SubmitterName>
<SubmitterLastname>${subLastName}</SubmitterLastname>
<SubmitterCity>${subCity}</SubmitterCity>
<SubmitterStreet>${subStreet}</SubmitterStreet>
<SubmitterType>${subType}</SubmitterType>
<RequestDate>${reqDate?.toLocaleDateString("en-CA") || ''}</RequestDate>
<AppealDate>${appealDate?.toLocaleDateString("en-CA") || ''}</AppealDate>
<RecipientCity>${recCity}</RecipientCity>
<RecipientStreet>${recStreet}</RecipientStreet>
<RequestDetails>${requestDetails}</RequestDetails>
<AuthorityName>${authorityName}</AuthorityName>
</sh:SilenceAppealFilter>`

export const rescriptXML = (
    appealId,
    rescriptDate,
    commissionerName,
    commissionerLastname,
    submitter,
    appealStatus,
) => `<?xml version="1.0" encoding="UTF-8"?>
<sh:RescriptFilter xmlns:sh="http://www.shared.com" >
<RescriptForAppeal>${appealId}</RescriptForAppeal>
<RescriptDate>${rescriptDate?.toLocaleDateString("en-CA") || ''}</RescriptDate>
<AppealStatus>${appealStatus}</AppealStatus>
<CommisionerName>${commissionerName}</CommisionerName>
<CommisionerLastname>${commissionerLastname}</CommisionerLastname>
<Submitter>${submitter}</Submitter>
</sh:RescriptFilter>`