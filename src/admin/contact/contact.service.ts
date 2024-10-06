import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { CreateContactDto, UpdateContactDto } from './dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    const newContact = await this.contactRepository.save(createContactDto);
    return plainToClass(CreateContactDto, newContact);
  }

  async findAll() {
    const contacts = await this.contactRepository.find();
    return contacts.map((contact) => plainToClass(CreateContactDto, contact));
  }

  async findOne(id: number) {
    const contact = await this.contactRepository.findOne({
      where: { id_contact: id },
    });

    if (!contact) {
      throw new BadRequestException(
        `Contact not found in database with id:${id}`,
      );
    }
    return plainToClass(CreateContactDto, contact);
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.findOne(id);
    const updatedContact = await this.contactRepository.save({
      ...contact,
      ...updateContactDto,
    });
    return plainToClass(UpdateContactDto, updatedContact);
  }

  async remove(id: number) {
    const contact = await this.findOne(id);

    if (!contact || !contact.active) {
      throw new BadRequestException(
        `Contact not found in database with id:${id}`,
      );
    }

    await this.contactRepository.save({
      ...contact,
      active: false,
    });

    return { message: 'Contact successfully removed' };
  }
}
