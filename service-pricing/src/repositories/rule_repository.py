from sqlalchemy.orm import Session

from src.repositories.base_repository import BaseRepository
from src.domain.rule import Rule
from src.database.rule_dto import RuleDTO
from src.domain.commands import RuleUpdateCommand


class RuleRepository(BaseRepository):
    def __init__(self, session):
        super().__init__()
        self.session: Session = session

    def save(self, rule: Rule):
        rule_dto = RuleDTO.from_entity(rule)
        self.session.add(rule_dto)
        return rule

    def update(self, cmd: RuleUpdateCommand):
        rule_update_attrs = dict(
            # sorcery
            [(k, v) for k, v in dict(cmd).items() if v is not None]
        )
        query = self.session.query(RuleDTO).filter_by(id=cmd.id)
        query.update(rule_update_attrs)
        return query.one().to_entity()

    def all(self):
        rules_dtos = self.session.query(RuleDTO).all()
        rules = []
        for rdto in rules_dtos:
            rule = rdto.to_entity()
            self.seen.add(rule)
            rules.append(rule)
        return rules

    def find_by_id(self, id):
        query = self.session.query(RuleDTO).filter_by(id=id)
        return query.one().to_entity()

    def active(self):
        query = self.session.query(RuleDTO).filter_by(active=True).first()
        return query.to_entity()
